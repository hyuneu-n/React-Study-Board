import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Pagination } from "react-bootstrap";
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
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 초기화
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fw-bold">{category.toUpperCase()}</h2>
        <Button className="btn btn-success" onClick={() => navigate(`/post-write/${category}`)}>
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
            <tr key={post.id} onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: 'pointer' }}>
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
    </div>
  );
}

// PropTypes를 추가하여 category prop의 타입을 검증합니다.
PostListPage.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PostListPage;