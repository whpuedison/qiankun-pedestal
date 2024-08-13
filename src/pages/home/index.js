import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import BIRDS from 'vanta/dist/vanta.birds.min';
import 'animate.css';
import { birdsBox, menuList } from './index.less';

function Home() {
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: myRef.current,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1,
        backgroundAlpha: 0.3,
        color1: 0x1a6138,
        color2: 0xf6f7f7,
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handlePageJump = (event) => {
    const target = event.target;
    const path = target.getAttribute('data-path');
    navigate(path)
  };

  return (
    <React.Fragment>
      <div className={birdsBox} ref={myRef}></div>
      <div 
        className={`${menuList} animate__animated animate__backInDown`}
        onClick={handlePageJump}
      >
          <span data-path="/virtual-list">等高虚拟列表</span>
          <span data-path="/virtual-list-pro">不等高虚拟列表</span>
          <span data-path="/concurrent-request">并发请求等待</span>
          <span data-path="/lazy-load" >图片懒加载</span>
          <span data-path="/batch-process">消息批处理</span>
          <span data-path="/performance-monitor">性能监控</span>
      </div>
    </React.Fragment>
  );
}

export default Home;
