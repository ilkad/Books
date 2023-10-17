import React from 'react';
import './App.css';
import AppRoutes from './AppRoutes';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1><a href="/">Bookstore Roweb</a></h1>
      <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
      </Routes>
    </div>
  );
}

export default App;
