import { useState } from "react";
import { loginUser } from "../services/UserService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaBookOpen, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await loginUser(user);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        window.location.href = ("/dashboard");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>

      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="card glass-card p-4 p-md-5 mx-auto w-100"
        style={{ maxWidth: "460px", borderRadius: "28px" }}
      >
        <div className="text-center mb-4">
          <div className="d-inline-flex p-3 rounded-circle text-white shadow-lg mb-3" style={{ background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)' }}>
            <FaBookOpen className="display-6" />
          </div>
          <h2 className="fw-extrabold text-gradient mb-1">
            Library Login
          </h2>
          <p className="text-secondary small fw-medium">
            Welcome back! Sign in to access your library account.
          </p>
        </div>

        <form onSubmit={handleLogin}>

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

          <div className="mb-4">
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
                placeholder="Enter your password"
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

          <button
            className="btn btn-purple-pink w-100 py-2.5 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : <>Login <FaArrowRight /></>}
          </button>

        </form>

        <p className="mt-4 text-center text-muted small fw-medium mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#ec4899' }}>
            Register Here
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;