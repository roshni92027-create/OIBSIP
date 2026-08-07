import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getBooks } from "../services/BookService";
import { issueBook } from "../services/IssuedBookService";
import Navbar from "../components/Navbar";
import { FaBook, FaUser, FaCheckCircle } from "react-icons/fa";

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
      console.log("Books Loaded:", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load books.");
    }
  };

  const handleIssue = async (e) => {
    e.preventDefault();

    console.log("========== ISSUE BOOK ==========");
    console.log("Book ID:", bookId);
    console.log("User ID:", userId);

    if (!bookId || !userId) {
      toast.error("Please select a book and enter User ID.");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending request...");

      const response = await issueBook(bookId, userId);

      console.log("Success Response:", response);

      toast.success("Book Issued Successfully!");

      setBookId("");
      setUserId("");

      loadBooks();

    } catch (error) {

      console.error("========== ERROR ==========");
      console.error(error);

      if (error.response) {

        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
        console.log("Data:", error.response.data);

        toast.error(error.response.data);

      } else if (error.request) {

        console.log(error.request);

        toast.error("Server not responding.");

      } else {

        console.log(error.message);

        toast.error(error.message);

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mt-4 mb-5" style={{ maxWidth: "720px" }}>

        <div className="card glass-card shadow-lg" style={{ borderRadius: "28px" }}>

          <div className="card-header card-header-gradient d-flex align-items-center gap-2 py-3">
            <FaBook className="fs-4 text-white" />
            <h3 className="mb-0 fs-4 fw-bold">Issue Library Book</h3>
          </div>

          <div className="card-body p-4 p-md-5">

            <form onSubmit={handleIssue}>

              <div className="mb-4">

                <label className="form-label fw-semibold text-secondary">
                  <FaBook className="me-2" /> Select Book Title
                </label>

                <select
                  className="form-select py-2.5"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  required
                >
                  <option value="">
                    -- Select Book --
                  </option>

                  {books.map((book) => (
                    <option
                      key={book.id}
                      value={book.id}
                    >
                      {book.title} (Stock: {book.quantity})
                    </option>
                  ))}

                </select>

              </div>

              <div className="mb-4">

                <label className="form-label fw-semibold text-secondary">
                  <FaUser className="me-2" /> Target User ID
                </label>

                <input
                  type="number"
                  className="form-control py-2.5"
                  placeholder="Enter User ID (e.g. 101)"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-purple-pink w-100 py-2.5 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2"
                disabled={loading}
              >
                <FaCheckCircle /> {loading ? "Issuing Book..." : "Confirm & Issue Book"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default IssueBook;