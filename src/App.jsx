import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';
import PostViewPage from './pages/PostViewPage';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterWrapper />
      </BrowserRouter>
    </Provider>
  );
}

function RouterWrapper() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: location.pathname === '/' ? '0' : '100px',
        }}
      >
        <Routes>
          {/* 메인 페이지 */}
          <Route index element={<MainPage />} />
          
          {/* 카테고리별 게시글 목록 조회 */}
          <Route path="thread" element={<PostListPage category="thread" />} />
          <Route path="qna" element={<PostListPage category="qna" />} />
          
          {/* 게시글 작성 */}
          <Route path="post-write/:category" element={<PostWritePage />} />
          
          {/* 특정 게시글 조회 */}
          <Route path=":category/post/:postId" element={<PostViewPage />} />
          
          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 회원가입 페이지 */}
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
