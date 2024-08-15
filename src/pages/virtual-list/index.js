import React, { useEffect, useState, useRef } from 'react';
import { throttle } from 'lodash'
import { root, realList, chatItem, chatContent, nickname, message, newMessage } from './index.less';
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

// 创建 IntersectionObserver 实例
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('目标元素进入视口');
            // 可以在这里处理目标元素进入视口后的逻辑
            // 例如，加载图片或执行动画
        } else {
            console.log('目标元素离开视口');
            // 可以在这里处理目标元素离开视口后的逻辑
        }
    });
}, {
    root: null, // 视口为默认的浏览器视口
    rootMargin: '0px', // 视口的边距
    threshold: 1.0 // 目标元素的可见度阈值（1.0表示完全可见）
});

const MIN_FRESH_TIME = 1000;
const CHAT_ITEM_HEIGHT = 50;
const RESTOCK_COUNT = 4

const VirtualList = () => {
    const [chatList, setChatList] = useState(chatData);
    const preChatListRef = useRef([])
    const preChatList = preChatListRef.current
    const realListRef = useRef()
    const delayTimer = useRef()
    const cacheQueue = useRef([])
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(0)
    const rootRef = useRef()
    const fillCountRef = useRef(0)
    const totalHeight = chatList.length * CHAT_ITEM_HEIGHT
    const visibleList = chatList?.slice(startIndex, endIndex)
    const initFlag = useRef(true)
    const isScrollAtBottomFlag = useRef(true)
    const newMessageCount = chatList.length - preChatList.length
    const [showMessageCount, setShowMessageCount] = useState(false)

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

    const scrollIntoBottom = active => {
        if (chatList.length) {
            const chatLength = chatList.length
            const totalCount = fillCountRef.current + RESTOCK_COUNT
            const _startIndex = chatLength - totalCount
            if(initFlag.current || isScrollAtBottomFlag.current || active) {
                preChatListRef.current = chatList
                setShowMessageCount(false)
                setStartIndex(_startIndex)
                setEndIndex(chatLength)
                realListRef.current.style.transform = `translate3d(0, ${_startIndex * CHAT_ITEM_HEIGHT}px, 0)`
                rootRef.current.scrollTo(
                    {
                        top: totalHeight,
                        behavior: "smooth"
                    }
                )
                initFlag.current = false
            } else {
                setShowMessageCount(true)
            }
        }
    }

    const isScrollAtBottom = () => {
        const { scrollHeight, scrollTop, clientHeight } = rootRef.current
        return scrollTop + clientHeight >= scrollHeight
    }

    useEffect(() => {
        rootRef.current.addEventListener('scroll', throttle(() => {
            isScrollAtBottomFlag.current = isScrollAtBottom()
        }, 500))
    }, [])

    const handleScroll = throttle(() => {
        const { scrollTop } = rootRef.current
        const newStartIndex = Math.floor(scrollTop / CHAT_ITEM_HEIGHT)
        const newEndIndex = newStartIndex + fillCountRef.current + RESTOCK_COUNT
        if (newStartIndex!== startIndex) {
            setStartIndex(newStartIndex)
            setEndIndex(newEndIndex)
            realListRef.current.style.transform = `translate3d(0, ${newStartIndex * CHAT_ITEM_HEIGHT}px, 0)`
        }
    }, 200)

    useEffect(() => {
        requestAnimationFrame(() => scrollIntoBottom())
    }, [chatList])

    const caculateFillCount = () => {
        const rootHight = rootRef.current.offsetHeight
        fillCountRef.current = Math.ceil(rootHight / CHAT_ITEM_HEIGHT)
    }

    useEffect(() => {
        // 计算填充数量
        caculateFillCount()

        setInterval(() => {
            appendData()
        }, 1000);

        // 清理延迟计时器
        return () => {
            if (delayTimer.current) {
                clearTimeout(delayTimer.current);
            }
        };
    }, []);

    return (
        <div className={root} ref={rootRef} onScroll={handleScroll}>
            <div style={{height: `${totalHeight}px`}}/>
            <div className={realList} ref={realListRef}>
                {
                    visibleList?.map((item, index) => (
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
            { showMessageCount && !!newMessageCount &&
                <div onClick={() => scrollIntoBottom(true)} className={newMessage}>{newMessageCount}条新消息</div>
            }
        </div>
    )
}

export default VirtualList