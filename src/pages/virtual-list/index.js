import React, { useEffect, useState, useRef, useMemo } from 'react';
import { root, placeholderList, realList, chatItem, chatContent, nickname, message } from './index.less';
import Mock from 'mockjs';

// 定义表情包
const emojis = [
    '😀', '😂', '😍', '😎', '😭', '😡', '😜', '😇', '😱', '😈',
    '👍', '👎', '🥺', '😢', '😳', '😋', '😬', '😑', '🥳', '😴'
];

const generateMessageWithEmojis = () => {
    // 生成 10 到 20 个表情包
    const numberOfEmojis = Mock.Random.integer(5, 10);
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
                'avatar': '@image("100x100", "#ffccff", "#000000", "Avatar")', // 生成头像图片的 URL
                'nickname': '@cname', // 中文名字
                'message': () => generateMessageWithEmojis() // 生成带有多个表情包的发言
            }
        ]
    });

    // 检查返回结果是否是数组，如果不是则处理为数组
    return result.chats instanceof Array ? result.chats : [result.chats];
};

const chatData = generateChatData(200);

const MIN_FRESH_TIME = 1000;
const CHAT_ITEM_HEIGHT = 50;
const RESTOCK_COUNT = 4

const VirtualList = () => {
    const [chatList, setChatList] = useState(chatData);
    const scrollRef = useRef()
    const realListRef = useRef()
    const delayTimer = useRef()
    const cacheQueue = useRef([])

    const [scrollHeight, setScrollHeight] = useState(0)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(0)
    const rootRef = useRef()
    const fillCountRef = useRef(0)

    const visiblelist = chatList?.slice(startIndex, endIndex)

    console.log('visiblelist', visiblelist)

    const appendData = () => {
        // 生成一个介于 x 到 y 之间的随机数量的数据
        const numEntries = Mock.Random.integer(0, 1);
        const newChatData = generateChatData(numEntries);
        cacheQueue.current = [...cacheQueue.current, ...newChatData];
        if (!delayTimer.current) {
            delayTimer.current = setTimeout(() => {
                const cacheQueueList = cacheQueue.current;
                cacheQueue.current = []
                setChatList(list => [...list, ...cacheQueueList]);
                clearTimeout(delayTimer.current)
                delayTimer.current = null;
            }, MIN_FRESH_TIME);
        }
    }

    const scrollIntoBottom = () => {
        if (chatList.length) {
            console.log(chatList)
            const chatLength = chatList.length
            const totalCount = fillCountRef.current + RESTOCK_COUNT
            const _startIndex = chatLength - totalCount
            setStartIndex(_startIndex)
            setEndIndex(chatLength)
        }
    }

    const handleScroll = e => {
        console.log(e)
    }

    useEffect(() => {
        realListRef.current.style.transform = `translate3d(0, ${startIndex * CHAT_ITEM_HEIGHT}px, 0)` /* 偏移，造成下滑效果 */
        console.log(startIndex, endIndex)
    }, [startIndex, endIndex])

    useEffect(() => {
        requestAnimationFrame(scrollIntoBottom)
        setScrollHeight(CHAT_ITEM_HEIGHT * chatList.length);
    }, [chatList])

    const caculateFillCount = () => {
        const rootHight = rootRef.current.offsetHeight
        fillCountRef.current = Math.ceil(rootHight / CHAT_ITEM_HEIGHT)
    }

    useEffect(() => {
        // 计算填充数量
        caculateFillCount()

        // setInterval(() => {
        //     appendData()
        // }, 400);

        // 清理延迟计时器
        return () => {
            if (delayTimer.current) {
                clearTimeout(delayTimer.current);
            }
        };
    }, []);

    return (
        <div className={root} ref={rootRef}>
            <div 
                className={placeholderList} 
                style={{height: `${CHAT_ITEM_HEIGHT * chatList.length}px`}} 
                ref={scrollRef}
                onScroll={handleScroll}
            >
                <div className={realList} ref={realListRef}>
                    {
                        visiblelist?.map((item, index) => (
                            <div key={index} className={chatItem}>
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

export default VirtualList