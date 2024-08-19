import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function PostViewPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = savedPosts.find((item) => item.id === Number(postId));
    setPost(foundPost);
  }, [postId]);

  const handleDelete = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.filter((item) => item.id !== Number(postId));
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
          <h3 style={{ fontWeight: "bold", fontFamily: 'Pretendard, sans-serif' }}>{post.title}</h3>
          <p>{post.content}</p>
          <p className="text-muted" style={{ color: '#6c757d' }}>{post.date}</p>
          <div className="d-flex justify-content-end">
            <Button variant="warning" style={{ marginRight: "10px" }} onClick={() => navigate(`/post-write/${post.category}?edit=${postId}`)}>
              수정하기
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              삭제하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h6>댓글</h6>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="댓글을 입력하세요"
        />
        <Button variant="primary">댓글 작성하기</Button>
      </div>
    </div>
  );
}

export default PostViewPage;
