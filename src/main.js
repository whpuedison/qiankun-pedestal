import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

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

function App() {
  return (
    <BrowserRouter basename="/qiankun-pedestal">
      <Suspense fallback='...'>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              Component={route.component}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
