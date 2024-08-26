import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerMicroApps, start } from 'qiankun';
import './index.css';
import App from './main';

// 注册子应用
registerMicroApps([
  {
    name: 'vue3App',
    entry: 'http://10.247.18.103:8080', // Vue3 子应用的入口地址
    container: '#vue3AppContainer', // 子应用挂载的 DOM 元素选择器
    activeRule: '/about', // 匹配的路由规则
  },
  {
    name: 'vue2App',
    entry: 'http://10.247.18.103:8081', // Vue2 子应用的入口地址
    container: '#vue2AppContainer', // 子应用挂载的 DOM 元素选择器
    activeRule: '/contact', // 匹配的路由规则
  },
]);

// 启动 qiankun 微前端框架
start();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
