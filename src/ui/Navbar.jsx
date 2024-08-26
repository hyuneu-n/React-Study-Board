import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

function Navbar() {
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
                onSuccess={(response) => console.log("구글 로그인 성공", response)}
                onError={() => console.log("구글 로그인 실패")}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
