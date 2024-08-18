import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function PostListPage({ category }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = savedPosts.filter((post) => post.category === category);
    setPosts(filteredPosts);
  }, [category]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/thread")}>Thread</button>
        <button className="btn btn-primary" onClick={() => navigate("/qna")}>QnA</button>
        <button className="btn btn-success" onClick={() => navigate(`/post-write/${category}`)}>Post</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">제목</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id} onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: 'pointer' }}>
              <th scope="row">{index + 1}</th>
              <td>{post.title}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PostListPage.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PostListPage;
