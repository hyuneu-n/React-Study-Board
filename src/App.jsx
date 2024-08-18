import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';
import PostViewPage from './pages/PostViewPage';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import PostListPage from './pages/PostListPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="text-center mt-10">
        <h1 
          className="animate__animated animate__bounce" 
          style={{ fontFamily: 'Pretendard, sans-serif', padding: '20px 0' }}
        >
          BLOG
        </h1>
      </div>
      <div className="pb-20 pt-8 bg-gray-50 min-h-screen">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="thread" element={<PostListPage category="thread" />} />
          <Route path="qna" element={<PostListPage category="qna" />} />
          <Route path="post-write/:category" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
