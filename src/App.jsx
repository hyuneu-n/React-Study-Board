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
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-gray-800">블로그</h1>
      </div>
      <div className="pb-20 pt-8 bg-gray-50 min-h-screen">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="shopping" element={<PostListPage category="shopping" />} />
          <Route path="free" element={<PostListPage category="free" />} />
          <Route path="post-write/:category" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
