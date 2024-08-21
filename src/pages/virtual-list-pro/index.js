import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash'
import { root, chatList, renderList, chatItem, chatContent, nickname, message } from './index.less'
import Mock from 'mockjs';

// 定义表情包
const emojis = [
    '😀', '😂', '😍', '😎', '😭', '😡', '😜', '😇', '😱', '😈',
    '👍', '👎', '🥺', '😢', '😳', '😋', '😬', '😑', '🥳', '😴'
];

const generateMessageWithEmojis = () => {
    // 生成 1 到 20 个表情包
    const numberOfEmojis = Mock.Random.integer(1, 20);
    const emojisString = Array.from({ length: numberOfEmojis }, () => Mock.Random.pick(emojis)).join(' ');
    return emojisString;
};

const generateChatData = (num) => {
    // 当 num 小于等于 0 时返回空数组
    if (num <= 0) {
        return [];
    }

    // 确保 Mock.mock 能正确生成单个对象的数组
    const result = Mock.mock({
        [`chats|${num}`]: [
            {
                'id|+1': 0,
                'avatar': function() {
                    return Mock.Random.image('100x100', Mock.Random.color(), '#000000', 'Avatar');
                }, // 生成头像图片的 URL，背景色为随机色
                'nickname': '@cname', // 中文名字
                'message': () => generateMessageWithEmojis() // 生成带有多个表情包的发言
            }
        ]
    });

    // 检查返回结果是否是数组，如果不是则处理为数组
    return result.chats instanceof Array ? result.chats : [result.chats];
};

const chatData = generateChatData(200);

const INIT_ITEM_HEIGHT = 48; // 初始列表项高度
const BUFFER_COUNT = 0; // 列表项需要缓冲的数量

const VirtualListPro = () => {
    const [list, setList] = useState(chatData) // 原始数据
    const [data, setData] = useState([]) // 渲染数据
    const [listHeight, setListHeight] = useState(0) // 列表高度
    const [renderCount, setRenderCount] = useState(0) // 列表项需要渲染的数量
    const [bufferCount, setBufferCount] = useState(2) // 列表项需要缓冲的数量
    const [start, setStart] = useState(0) // 列表项开始渲染的位置
    const [end, setEnd] = useState(0) // 列表项结束渲染的位置
    const [currentOffset, setCurrentOffset] = useState(0) // 偏移量
    const [positions, setPositions] = useState([
        // index 当前元素的下标
        // top 顶部位置
        // bottom 底部位置
        // height 元素的高度
        // dHeight 用于判断元素是否需要改变
    ]) // 需要记录每一项的高度

    const chatRef = useRef() // 聊天区
    const renderRef = useRef() // 渲染区

    const initPositions = () => {
        const data = []
        for (let i = 0; i < list.length; i++) {
            data.push({
                index: i,
                height: INIT_ITEM_HEIGHT,
                top: i * INIT_ITEM_HEIGHT,
                bottom: (i + 1) * INIT_ITEM_HEIGHT,
                dHeight: 0
            })
        }
        setPositions(data)
    }

    useEffect(() => {
        // 初始高度
        initPositions()
      }, [])

      const setPostition = () => {
        const nodes = renderRef.current?.childNodes
        if (!nodes.length) return
        nodes.forEach(node => {
            if (!node) return
            const rect = node.getBoundingClientRect() // 获取元素的信息
            const index = +node.id // 获取元素的索引
            const oldHeight = positions[index].height // 获取旧的高度
            const newHeight = rect.height // 获取新的高度
            const dHeight = oldHeight - newHeight  // 元素需要改变的高度
            if (dHeight) {
                positions[index] = {
                    ...positions[index],
                    height: newHeight,
                    bottom: positions[index].bottom - dHeight, // 将自身能算的先算
                    dHeight: dHeight //差值保留，留给后面元素计算使用
                }
            }
            const startId = +nodes[0].id // 开始渲染的元素的索引
            const positionsLength = positions.length
            let totalDHeight = positions[startId].dHeight // 累计差值，仅对后面元素有影响
            positions[startId].dHeight = 0
            for (let i = startId + 1; i < positionsLength; i++) {
                const item = positions[i]
                positions[index] = {
                    ...positions[index],
                    top: positions[index - 1]?.bottom,
                    bottom: positions[index].bottom - totalDHeight, // 将自身能算的先算
                }
                if (item.dHeight) {
                    totalDHeight += item.dHeight
                    item.dHeight = 0
                }
            }
            setListHeight(positions.at(-1)?.bottom)
        })
      }

      useEffect(() => {
        if (renderRef.current) {
            setPostition()
        }
      }, [renderRef.current])

    useEffect(() => {
        const chatAreaHeight = chatRef.current?.offsetHeight // 聊天区域高度
        const _renderCount = Math.ceil(chatAreaHeight / INIT_ITEM_HEIGHT) // 所需渲染的列表项
        const _listHeight = positions.at(-1)?.bottom // 列表长度
        const _end = _renderCount + BUFFER_COUNT
        setRenderCount(_renderCount)
        setEnd(_end)
        setListHeight(_listHeight)
        setData(list.slice(0, _end))
    }, [chatRef.current, list])

    const binarySearch = () => {
        const { scrollTop } = chatRef.current
        let startIndex = 0
        let endIndex = positions.length - 1
        let tempIndex = null
        while (startIndex <= endIndex) {
            const midIndex = Math.floor((startIndex + endIndex) / 2)
            const midVal = positions[midIndex].bottom
            if (midVal === scrollTop) {
                return midIndex + 1
            } else if (midVal < scrollTop) {
                startIndex = midIndex + 1
            } else if (midVal > scrollTop) {
                if (tempIndex === null || tempIndex > midIndex) {
                    tempIndex = midIndex
                }
                endIndex -= 1
            }
        }
        return tempIndex
    }

    const handleScroll = throttle(() => {
        const _start = binarySearch()
        const _end = _start + renderCount + bufferCount
        setStart(_start)
        setEnd(_end)
        setCurrentOffset(_start > 0 ? positions[_start - 1].bottom : 0)
        console.log(`start: ${_start}, end: ${_end}, currentOffset: ${positions[_start - 1]?.bottom || 0}`)
    }, 100)

    useEffect(() => {
        setData(list.slice(start, end))
        if (renderRef.current) {
            setPostition()
        }
    }, [start])

    return (
        <div className={root}>
            <div 
                className={chatList} 
                ref={chatRef}
                onScroll={handleScroll}
            >
                <div style={{height: `${listHeight}px`}}></div>
                <div 
                    style={{ transform: `translate3d(0, ${currentOffset}px, 0)`}}
                    className={renderList} 
                    ref={renderRef}
                >
                    {
                        data?.map((item, index) => (
                            <div id={item.id} key={index} className={chatItem}>
                                <img src={item.avatar} alt="avatar" />
                                <div className={chatContent}>
                                    <div className={nickname}>{item.nickname}</div>
                                    <div className={message}>{item.message}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )    
}

export default VirtualListPro