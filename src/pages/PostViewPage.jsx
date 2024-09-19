import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchPostById, deletePost } from "../data/api"; // API 호출 함수들
import CommentList from "../components/CommentList";

function PostViewPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(postId);
        setPost(data);
      } catch (error) {
        console.error("게시글 조회 오류:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      navigate(-1);
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <Button className="mb-3" variant="secondary" onClick={() => navigate(-1)}>
        뒤로 가기
      </Button>
      <div className="card">
        <div className="card-body">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{post.date}</p>
          <Button variant="danger" onClick={handleDelete}>
            삭제하기
          </Button>
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
        />
        <Button variant="primary">댓글 작성하기</Button>
      </div>
      <CommentList comments={post.comments} />
    </div>
  );
}

export default PostViewPage;
