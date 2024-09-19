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
          <Route index element={<MainPage />} />
          <Route path="thread" element={<PostListPage category="thread" />} />
          <Route path="qna" element={<PostListPage category="qna" />} />
          <Route path="post-write/:category" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
