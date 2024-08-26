import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Pagination, Modal, Form } from "react-bootstrap";
import { setSearchTerm } from "../store";
import PropTypes from 'prop-types';

function PostListPage({ category }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) =>
    state.posts.items.filter(
      (post) =>
        post.category === category &&
        (post.title.includes(state.posts.searchTerm) ||
          post.content.includes(state.posts.searchTerm))
    )
  );
  const searchTerm = useSelector((state) => state.posts.searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setCurrentPage(1);
  };

  const handleSave = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPost = {
      id: Date.now(),
      title,
      content,
      category,
      date: new Date().toLocaleDateString(),
      comments: [],
    };
    savedPosts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    setShowModal(false);

    // 카테고리 페이지로 이동 후 새로고침
    navigate(`/${category}`, { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    // 페이지가 처음 로드될 때 새로고침하여 최신 데이터를 가져옴
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    dispatch({ type: 'posts/setItems', payload: savedPosts });
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fw-bold">{category.toUpperCase()}</h2>
        <Button className="btn btn-success" onClick={() => setShowModal(true)}>
          Post
        </Button>
      </div>
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control mb-3"
      />
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>#</th>
            <th style={{ width: '70%' }}>제목</th>
            <th style={{ width: '20%' }}>날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              style={{
                cursor: 'pointer',
              }}
            >
              <td>{indexOfFirstPost + index + 1}</td>
              <td>{post.title}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>새 글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSave}>
            저장하기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

PostListPage.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PostListPage;
