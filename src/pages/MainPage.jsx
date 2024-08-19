import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostModal from "../components/PostModal";

function MainPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSave = (post) => {
    // 새 글 저장 로직
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPost = {
      id: Date.now(),
      title: post.title,
      content: post.content,
      category: post.category,
      date: new Date().toLocaleDateString(),
      comments: [],
    };
    savedPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    handleClose();
    navigate(`/${newPost.category}`);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light"
      style={{
        overflow: "hidden",
      }}
    >
      <img
        src="/wow.png"
        alt="WOW"
        style={{
          cursor: "pointer",
          width: "150px",
          marginBottom: "20px",
        }}
        onClick={handleShow}
      />
      <div className="d-flex justify-content-center mt-3">
        <Button className="mx-2" variant="dark" onClick={() => navigate("/thread")}>
          Thread
        </Button>
        <Button className="mx-2" variant="dark" onClick={() => navigate("/qna")}>
          QnA
        </Button>
      </div>

      {/* Post 작성 모달 */}
      <PostModal show={showModal} handleClose={handleClose} handleSave={handleSave} />
    </div>
  );
}

export default MainPage;
