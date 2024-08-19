import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // useLocation 추가
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';
import PostViewPage from './pages/PostViewPage';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import PostListPage from './pages/PostListPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <RouterWrapper />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

function RouterWrapper() {
  const location = useLocation();  // useLocation 훅 사용

  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: location.pathname === '/' ? '0' : '100px', // 메인 페이지(/)에서는 상단 마진을 0으로 설정
        }}
      >
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="thread" element={<PostListPage category="thread" />} />
          <Route path="qna" element={<PostListPage category="qna" />} />
          <Route path="post-write/:category" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
