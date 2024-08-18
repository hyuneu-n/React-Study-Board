import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";

function PostList({ onClickItem }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      {currentPosts.map((post) => (
        <PostListItem
          key={post.id}
          post={post}
          onClick={() => onClickItem(post)}
          onDelete={handleDelete}
        />
      ))}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary mx-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}

PostList.propTypes = {
  onClickItem: PropTypes.func.isRequired,
};

export default PostList;
