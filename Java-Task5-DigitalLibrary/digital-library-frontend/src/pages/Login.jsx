import { useState } from "react";
import { loginUser } from "../services/UserService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(user);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        window.location.href = ("/dashboard");
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="container mt-5">

      <ToastContainer />

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">
          📚 Library Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;