import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          📚 Digital Library
        </Link>

        <div className="d-flex flex-wrap gap-2">

          <Link className="btn btn-outline-light" to="/dashboard">
            Dashboard
          </Link>

          <Link className="btn btn-outline-success" to="/issue-book">
            Issue Book
          </Link>

          <Link className="btn btn-outline-warning" to="/issued-books">
            Issued Books
          </Link>

          <Link className="btn btn-outline-info" to="/reservations">
            Reservations
          </Link>

          <Link className="btn btn-outline-primary" to="/fine-management">
            💰 Fine Management
          </Link>

          <Link className="btn btn-outline-secondary" to="/contact">
            Contact
          </Link>

          <Link className="btn btn-outline-light" to="/contact-messages">
            Messages
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;