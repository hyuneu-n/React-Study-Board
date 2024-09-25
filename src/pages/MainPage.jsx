import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../store";
import PostModal from "../components/PostModal";
import { createPost } from "../data/api"; // 게시글 작성 API 함수 불러오기

function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState("/wow.png");

  // 로그인한 사용자 정보 상태 관리
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage에서 사용자 정보 불러오기
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // 게시글 작성 후 저장하는 함수
  const handleSave = async (post) => {
    const newPost = {
      title: post.title,
      content: post.content,
      category: post.category,
    };

    try {
      // API 호출을 통해 백엔드로 게시글 작성 요청 보내기
      const savedPost = await createPost(newPost);
      console.log("서버에 저장된 게시글:", savedPost); // 서버에서 응답받은 데이터 확인

      // Redux에 게시글 추가 및 페이지 이동
      dispatch(addPost(savedPost));
      handleClose();
      navigate(`/${newPost.category}`);
    } catch (error) {
      console.error("게시글 작성 중 오류 발생:", error);
    }
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
