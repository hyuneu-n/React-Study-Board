import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <button className="btn btn-primary my-2" onClick={() => navigate("/thread")}>
        Thread
      </button>
      <button className="btn btn-primary my-2" onClick={() => navigate("/qna")}>
        QnA
      </button>
      <button className="btn btn-success my-2" onClick={() => navigate("/post-write/threads")}>
        Post
      </button>
    </div>
  );
}

export default MainPage;
