import logo from './logo.svg';
import './App.css';
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;


function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <BrowserRouter>
        <MainTitleText>소플의 미니 블로그</MainTitleText>
        <Routes>
            <Route index element={<MainPage />} />
            <Route path="post-write" element={<PostWritePage />} />
            <Route path="post/:postId" element={<PostViewPage />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
