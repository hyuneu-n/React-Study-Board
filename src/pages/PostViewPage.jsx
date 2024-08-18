import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button";

function PostViewPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = savedPosts.find((item) => item.id === Number(postId));
    setPost(foundPost);
  }, [postId]);

  const saveComment = () => {
    const updatedPost = {
      ...post,
      comments: [...post.comments, { id: Date.now(), content: comment }],
    };

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost(updatedPost);
    setComment("");
  };

  if (!post) {
    return <div>포스트를 불러오는 중입니다...</div>;
  }

  return (
    <div className="container mt-4">
      <Button title="뒤로 가기" onClick={() => navigate("/")} />
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content}</p>
        </div>
      </div>
      <div className="mt-4">
        <h6>댓글</h6>
        {post.comments.map((comment) => (
          <div key={comment.id} className="border p-2 mb-2">
            {comment.content}
          </div>
        ))}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control mb-3"
          placeholder="댓글을 입력하세요"
        />
        <Button title="댓글 작성하기" onClick={saveComment} />
      </div>
    </div>
  );
}

export default PostViewPage;
