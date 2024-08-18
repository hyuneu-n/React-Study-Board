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

  const deletePost = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.filter((p) => p.id !== post.id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate(`/${post.category}`);
  };

  const deleteComment = (commentId) => {
    const updatedPost = {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId),
    };

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPost(updatedPost);
  };

  const editPost = () => {
    navigate(`/post-write/${post.category}?edit=${post.id}`);
  };

  if (!post) {
    return <div>포스트를 불러오는 중입니다...</div>;
  }

  return (
    <div className="container mt-4" style={{ fontFamily: 'Pretendard' }}>
      <Button title="뒤로 가기" onClick={() => navigate(`/${post.category}`)} />
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content}</p>
          <p className="text-muted">작성일: {post.date}</p>
          <div className="d-flex gap-3">  {/* gap-2 -> gap-3으로 간격 조정 */}
            <Button title="수정하기" variant="warning" onClick={editPost} />
            <Button title="삭제하기" variant="danger" onClick={deletePost} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h6>댓글</h6>
        {post.comments.map((comment) => (
          <div key={comment.id} className="border p-2 mb-2 d-flex justify-content-between">
            {comment.content}
            <Button title="삭제" variant="danger" onClick={() => deleteComment(comment.id)} />
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
