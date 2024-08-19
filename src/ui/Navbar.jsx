import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">홈</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/threads">Thread</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/qna">QnA</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post">Post</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
