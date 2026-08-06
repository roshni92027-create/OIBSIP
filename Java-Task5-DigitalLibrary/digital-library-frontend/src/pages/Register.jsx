import { useState } from "react";
import { registerUser } from "../services/UserService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
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
      }
  };

  return (
    <div className="container mt-5">

      <ToastContainer />

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >

        <h2 className="text-center mb-4">
          📚 Register
        </h2>

        <form onSubmit={handleRegister}>

          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

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

          <select
            className="form-select mb-3"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;