import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../store";
import PostModal from "../components/PostModal";

function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSave = (post) => {
    const newPost = {
      id: Date.now(),
      title: post.title,
      content: post.content,
      category: post.category,
      date: new Date().toLocaleDateString(),
      comments: [],
    };
    dispatch(addPost(newPost));
    handleClose();
    navigate(`/${newPost.category}`);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <img
        src="/wow.png"
        alt="WOW"
        style={{ cursor: "pointer", width: "150px", marginBottom: "20px" }}
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

      <PostModal show={showModal} handleClose={handleClose} handleSave={handleSave} />
    </div>
  );
}

export default MainPage;
