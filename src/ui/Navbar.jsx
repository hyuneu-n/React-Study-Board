import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const jwtDecode = (await import('jwt-decode')).default;  // dynamic import 사용
      const decoded = jwtDecode(token);  // jwtDecode 함수 사용
      localStorage.setItem("user", JSON.stringify({
        name: decoded.name || decoded.email,  // 사용자 이름 또는 이메일 저장
        email: decoded.email,
      }));

      console.log("구글 로그인 성공:", decoded);

      navigate("/thread");
    } catch (error) {
      console.error("JWT 디코딩 중 오류 발생:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log("구글 로그인 실패:", error);
    alert("로그인에 실패했습니다. 다시 시도해 주세요.");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HOME</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/thread">Thread</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/qna">QnA</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
