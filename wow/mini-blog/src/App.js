import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';
import PostViewPage from './pages/PostViewPage';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const ContentWrapper = styled.div`
  padding-bottom: 50px; /* Ensure space for fixed footer */
`;

function App(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <MainTitleText>블로그</MainTitleText>
      <ContentWrapper>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="post-write" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
        </Routes>
      </ContentWrapper>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
