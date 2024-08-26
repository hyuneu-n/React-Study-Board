import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CommentList from "../components/CommentList";
import { deletePost, updatePost } from "../store";

function PostViewPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.items.find((item) => item.id === Number(postId))
  );
  const [commentText, setCommentText] = useState("");

  const handleDelete = () => {
    dispatch(deletePost(Number(postId)));
    navigate(-1);
  };

  const handleAddComment = () => {
    if (commentText.trim() === "") return;

    const newComment = {
      id: Date.now(),
      content: commentText,
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, // 초를 제외한 날짜와 시간 추가
    };

    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    dispatch(updatePost(updatedPost));
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    const updatedPost = {
      ...post,
      comments: post.comments.filter(comment => comment.id !== commentId),
    };

    dispatch(updatePost(updatedPost));
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
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddComment}>댓글 작성하기</Button>
      </div>
      <CommentList comments={post.comments} onDelete={handleDeleteComment} />
    </div>
  );
}

export default PostViewPage;
