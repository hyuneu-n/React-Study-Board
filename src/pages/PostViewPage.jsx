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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
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

    const newComment = {
      id: Date.now(),
      content: commentText,
      date: new Date().toLocaleString(),
      author: user.email, // 작성자 정보에 이메일 추가
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

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost(updatedPost);
  };

  const handleDeletePost = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.filter((p) => p.id !== post.id);

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate(-1);
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
          <p className="text-muted">작성자: {post.author}</p>
          {user && user.email === post.author && (
            <div className="d-flex justify-content-end">
              <Button variant="warning" style={{ marginRight: "10px" }} onClick={() => navigate(`/post-write/${post.category}?edit=${postId}`)}>
                수정하기
              </Button>
              <Button variant="danger" onClick={handleDeletePost}>
                삭제하기
              </Button>
            </div>
          )}
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
