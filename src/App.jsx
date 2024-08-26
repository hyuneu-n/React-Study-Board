import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store';
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';
import PostViewPage from './pages/PostViewPage';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import PostListPage from './pages/PostListPage';

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <BrowserRouter>
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
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
