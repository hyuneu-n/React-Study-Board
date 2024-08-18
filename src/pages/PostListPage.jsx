import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../ui/Button";

function PostListPage({ category }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (category === "all") {
      setPosts(savedPosts);
    } else {
      const filteredPosts = savedPosts.filter((post) => post.category === category);
      setPosts(filteredPosts);
    }
  }, [category]);

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <Button title="쇼핑 게시판" onClick={() => navigate("/shopping")} />
        <Button title="자유 게시판" onClick={() => navigate("/free")} />
        <Button title="글쓰기" variant="success" onClick={() => navigate(`/post-write/${category}`)} />
      </div>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <Button title="삭제하기" variant="danger" onClick={() => handleDelete(post.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

PostListPage.propTypes = {
  category: PropTypes.string.isRequired,
};

export default PostListPage;
