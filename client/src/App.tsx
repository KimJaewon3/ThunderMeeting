import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './pages/main';
import Menu from './pages/menu';
import Room from './pages/room';
import Mypage from './pages/mypage';
import Intro from './pages/intro';
import axios from 'axios';
import ModifyPw from './pages/modifyPw';

export const APIURL = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV,
  headers: {
    "content-type": "application/json",
    credentials: true,
  },
});

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        
        <section className="section">
          <Routes>
            <Route path="/" element={<Intro/>} />
            <Route path="/main" element={<Main />} />
            <Route path="/room" element={<Room />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/modifyPw" element={<ModifyPw />} />
          </Routes>
        </section>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
