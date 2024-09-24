import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../store";
import PostModal from "../components/PostModal";

function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState("/wow.png");

  // 로그인한 사용자 정보 상태 관리
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage에서 사용자 정보 불러오기
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
      {user ? (
        <h5>{user.nickname}님 반갑습니다!</h5>
      ) : (
        <h5>게시글을 작성하려면 로그인이 필요합니다</h5>
      )}

      <img
        src={imageSrc}
        alt="WOW"
        style={{
          cursor: "pointer",
          width: "150px",
          marginBottom: "20px",
        }}
        onClick={handleShow}
        onMouseEnter={() => setImageSrc("/wow2.png")}
        onMouseLeave={() => setImageSrc("/wow.png")}
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
