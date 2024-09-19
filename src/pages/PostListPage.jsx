import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Pagination, Modal, Form } from "react-bootstrap";
import { fetchPosts, createPost } from "../data/api"; // API 호출 함수들
import PropTypes from 'prop-types';

function PostListPage({ category }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const postsPerPage = 5;

  // 여기에서 fetchPosts 함수 호출
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(category);  // API에서 가져온 fetchPosts 함수 사용
        setPosts(data);
      } catch (error) {
        console.error('게시글 불러오기 오류:', error);
      }
    };
  
    loadPosts();  // API에서 fetchPosts 호출
  }, [category]); // category가 변경될 때마다 호출

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSave = async () => {
    const newPost = {
      title,
      content,
      category,
      date: new Date().toLocaleDateString(),
    };
    try {
      await createPost(newPost);
      setShowModal(false);
      window.location.reload();  // 새로고침하여 리스트 업데이트
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fw-bold">{category.toUpperCase()}</h2>
        <Button className="btn btn-success" onClick={() => setShowModal(true)}>
          Post
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              style={{ cursor: 'pointer' }}
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
