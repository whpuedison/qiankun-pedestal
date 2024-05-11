import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div />
      <div>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
