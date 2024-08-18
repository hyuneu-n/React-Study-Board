import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <button className="btn btn-primary my-2" onClick={() => navigate("/shopping")}>
        쇼핑 게시판
      </button>
      <button className="btn btn-primary my-2" onClick={() => navigate("/free")}>
        자유 게시판
      </button>
      <button className="btn btn-success my-2" onClick={() => navigate("/post-write/shopping")}>
        글쓰기
      </button>
    </div>
  );
}

export default MainPage;
