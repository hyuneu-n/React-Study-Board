import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import { Button } from "react-bootstrap";

function PostViewPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = savedPosts.find((item) => item.id === Number(postId));
    setPost(foundPost);
  }, [postId]);

  const handleAddComment = () => {
    if (!isAuthenticated) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      navigate("/login");
      return;
    }

    if (commentText.trim() === "") return;

    const user = JSON.parse(localStorage.getItem("user")); // 사용자 정보 가져오기

    const newComment = {
      id: Date.now(),
      content: commentText,
      date: new Date().toLocaleString(),
      author: user.name || user.email, // 작성자 정보 추가
    };

    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost(updatedPost);
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = post.comments.filter(comment => comment.id !== commentId);
    const updatedPost = { ...post, comments: updatedComments };

    // 로컬 스토리지 업데이트
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost(updatedPost);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <Button className="mb-3" variant="secondary" onClick={() => navigate(-1)}>
        뒤로 가기
      </Button>
      <div className="card">
        <div className="card-body">
          <h3 style={{ fontWeight: "bold" }}>{post.title}</h3>
          <p>{post.content}</p>
          <p className="text-muted">{post.date}</p>
          <p className="text-muted">작성자: {post.author}</p> {/* 작성자 표시 */}
        </div>
      </div>
      <div className="mt-4">
        <h6>댓글</h6>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="댓글을 입력하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={!isAuthenticated}
        />
        <Button
          variant="primary"
          onClick={handleAddComment}
          disabled={!isAuthenticated}
        >
          댓글 작성하기
        </Button>
      </div>
      <CommentList comments={post.comments} onDelete={handleDeleteComment} />
    </div>
  );
}

export default PostViewPage;
