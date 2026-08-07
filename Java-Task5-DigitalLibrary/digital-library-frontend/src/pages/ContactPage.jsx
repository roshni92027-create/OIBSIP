import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { sendMessage } from "../services/ContactService";
import { FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending:", formData);

      const response = await sendMessage(formData);

      console.log("Response:", response.data);

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {

      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      toast.error("Failed to send message.");
    }
  };

  return (
    <>
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mt-4 mb-5" style={{ maxWidth: "720px" }}>

        <div className="card glass-card shadow-lg" style={{ borderRadius: "28px" }}>

          <div className="card-header card-header-gradient d-flex align-items-center gap-2 py-3">
            <FaEnvelope className="fs-4 text-white" />
            <h3 className="mb-0 fs-4 fw-bold">Contact Library Support</h3>
          </div>

          <div className="card-body p-4 p-md-5">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">
                  <FaUser className="me-2" /> Your Name
                </label>
                <input
                  type="text"
                  className="form-control py-2.5"
                  placeholder="Enter full name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">
                  <FaEnvelope className="me-2" /> Email Address
                </label>
                <input
                  type="email"
                  className="form-control py-2.5"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="Write your message or inquiry here..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-purple-pink w-100 py-2.5 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2"
              >
                <FaPaperPlane /> Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </>
  );
}

export default ContactPage;