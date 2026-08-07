import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen, FaCompass, FaBookmark, FaCoins, FaEnvelope, FaCommentAlt, FaSignOutAlt, FaBook } from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg glass-navbar my-3">

      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap gap-3">

        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/dashboard">
          <div className="bg-gradient p-2 rounded-3 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)' }}>
            <FaBookOpen className="fs-4" />
          </div>
          <span className="text-gradient fs-4 fw-extrabold">Digital Library</span>
        </Link>

        <div className="d-flex flex-wrap gap-2 align-items-center">

          <Link className="btn btn-sm btn-outline-primary" to="/dashboard">
            <FaCompass /> Dashboard
          </Link>

          <Link className="btn btn-sm btn-outline-success" to="/issue-book">
            <FaBook /> Issue Book
          </Link>

          <Link className="btn btn-sm btn-outline-warning" to="/issued-books">
            <FaBookOpen /> Issued Books
          </Link>

          <Link className="btn btn-sm btn-outline-info" to="/reservations">
            <FaBookmark /> Reservations
          </Link>

          <Link className="btn btn-sm btn-purple-pink" to="/fine-management">
            <FaCoins /> Fine Management
          </Link>

          <Link className="btn btn-sm btn-outline-secondary" to="/contact">
            <FaEnvelope /> Contact
          </Link>

          <Link className="btn btn-sm btn-outline-dark" to="/contact-messages">
            <FaCommentAlt /> Messages
          </Link>

          <button
            className="btn btn-sm btn-danger px-3 ms-1"
            onClick={logout}
          >
            <FaSignOutAlt /> Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;