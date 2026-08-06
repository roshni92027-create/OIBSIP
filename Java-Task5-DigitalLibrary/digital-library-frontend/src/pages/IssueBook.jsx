import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getBooks } from "../services/BookService";
import { issueBook } from "../services/IssuedBookService";
import Navbar from "../components/Navbar";

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

//         alert(
//           "STATUS: " +
//             error.response.status +
//             "\n\n" +
//             JSON.stringify(error.response.data, null, 2)
//         );

        toast.error(error.response.data);

      } else if (error.request) {

        console.log(error.request);

        // alert("Server did not respond.");

        toast.error("Server not responding.");

      } else {

        console.log(error.message);

        // alert(error.message);

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

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-success text-white">
            <h3 className="mb-0">📚 Issue Book</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleIssue}>

              <div className="mb-3">

                <label className="form-label">
                  Select Book
                </label>

                <select
                  className="form-select"
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

              <div className="mb-3">

                <label className="form-label">
                  User ID
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Issuing..." : "Issue Book"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default IssueBook;