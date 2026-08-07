import { useState } from "react";
import { registerUser } from "../services/UserService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaBookReader, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await registerUser(user);

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
        console.error(error);
        console.error(error.response);

        toast.error(
          error.response?.data?.message || "Registration Failed"
        );
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>

      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="card glass-card p-4 p-md-5 mx-auto w-100"
        style={{ maxWidth: "480px", borderRadius: "28px" }}
      >
        <div className="text-center mb-4">
          <div className="d-inline-flex p-3 rounded-circle text-white shadow-lg mb-3" style={{ background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)' }}>
            <FaBookReader className="display-6" />
          </div>
          <h2 className="fw-extrabold text-gradient mb-1">
            Create Account
          </h2>
          <p className="text-secondary small fw-medium">
            Join our digital reading community & manage your loans.
          </p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary small">
              Full Name
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <FaUser />
              </span>
              <input
                className="form-control border-start-0"
                type="text"
                name="name"
                placeholder="John Doe"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary small">
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <FaEnvelope />
              </span>
              <input
                className="form-control border-start-0"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary small">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <FaLock />
              </span>
              <input
                className="form-control border-start-0 border-end-0"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-outline-secondary border-start-0"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary small">
              Account Role
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <FaUserShield />
              </span>
              <select
                className="form-select border-start-0"
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="USER">User (Reader)</option>
                <option value="ADMIN">Admin (Librarian)</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-purple-pink w-100 py-2.5 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : <>Register Account <FaUserPlus /></>}
          </button>

        </form>

        <p className="mt-4 text-center text-muted small fw-medium mb-0">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#ec4899' }}>
            Login Here
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;