import React, { useEffect, useState } from 'react';
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
  return Mock.mock({
    [`chats|${num}`]: [
      {
        'avatar': '@image("100x100", "#ffccff", "#000000", "Avatar")', // 生成头像图片的 URL
        'nickname': '@cname', // 中文名字
        'message': () => generateMessageWithEmojis() // 生成带有多个表情包的发言
      }
    ]
  }).chats;
};

const chatData = generateChatData(100);

// 监控FPS
const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || (callback => setTimeout(callback, 1000 / 60));
const average = numbers => Math.round(numbers.reduce((sum, value) => sum + value, 0) / numbers.length);

let frame = 0
let initTime = Date.now();
let fpsArr = []

const loop = () => {
    let now = Date.now();
    frame++;
    if (now - initTime > 1000) {
        let fps = Math.round((frame * 1000) / (now - initTime));
        fpsArr.push(fps);
        console.log(`fps: ${fps}, 最小值: ${Math.min(...fpsArr)}, 最大值: ${Math.max(...fpsArr)}, 平均值: ${average(fpsArr)}`);
        frame = 0;
        initTime = now;
    }
    rAF(loop);
}

rAF(loop);

const VirtualList = () => {
    const [chatList, setChatList] = useState(chatData);

    const appendData = () => {
        // 生成一个介于 500 到 2000 之间的随机数量的数据
        const numEntries = Mock.Random.integer(50, 20);
        const newChatData = generateChatData(numEntries);
        setChatList(list => [...list,...newChatData]);
    }

    useEffect(() => {
        setInterval(() => {
            appendData()
        }, 5000);
    }, [])

    return (
        <div className={root}>
            <div className={placeholderList}>
                <div className={realList}>
                    {
                        chatList.map((item, index) => (
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