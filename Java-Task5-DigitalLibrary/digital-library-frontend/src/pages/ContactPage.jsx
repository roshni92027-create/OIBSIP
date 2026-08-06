import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { sendMessage } from "../services/ContactService";

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

//         alert(
//           JSON.stringify(error.response.data, null, 2)
//         );
      }

      toast.error("Failed to send message.");
    }
  };

  return (
    <>
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>📩 Contact Us</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Message</label>
                <textarea
                  rows="5"
                  className="form-control"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </>
  );
}

export default ContactPage;