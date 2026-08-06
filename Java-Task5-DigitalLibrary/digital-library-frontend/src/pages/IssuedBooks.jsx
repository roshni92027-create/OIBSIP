import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import {
  getIssuedBooks,
  returnBook,
  updateDueDate,
} from "../services/IssuedBookService";
import { exportToPDF, exportToCSV } from "../utils/exportUtils";

function IssuedBooks() {

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    loadIssuedBooks();
  }, []);

  const loadIssuedBooks = async () => {
    try {
      setLoading(true);
      const response = await getIssuedBooks();
      setIssuedBooks(response.data);
    } catch (error) {
      toast.error("Unable to load issued books.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const headers = ["ID", "Book Title", "User", "Issue Date", "Due Date", "Return Date", "Status", "Fine"];
    const rows = issuedBooks.map((issue) => [
      issue.id,
      issue.book?.title || "-",
      issue.user?.name || "-",
      issue.issueDate || "-",
      issue.dueDate || "-",
      issue.returnDate || "-",
      issue.status,
      `Rs ${issue.fine}`,
    ]);
    exportToPDF("Digital Library - Issued Books Report", headers, rows, "Issued_Books_Report.pdf", `Total Records: ${issuedBooks.length}`);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Book Title", "User", "Issue Date", "Due Date", "Return Date", "Status", "Fine"];
    const rows = issuedBooks.map((issue) => [
      issue.id,
      issue.book?.title || "-",
      issue.user?.name || "-",
      issue.issueDate || "-",
      issue.dueDate || "-",
      issue.returnDate || "-",
      issue.status,
      issue.fine,
    ]);
    exportToCSV("Issued_Books.csv", headers, rows);
  };

  const handleReturn = async (id) => {
    // if (!window.confirm("Return this book?")) return;

    try {
      await returnBook(id);
      toast.success("Book returned successfully!");
      loadIssuedBooks();
    } catch (error) {
      toast.error("Unable to return book.");
    }
  };

  const handleEdit = (issue) => {
    setEditingId(issue.id);
    setNewDueDate(issue.dueDate);
  };

  const handleSave = async () => {
    try {
      await updateDueDate(editingId, newDueDate);
      toast.success("Due Date Updated");
      setEditingId(null);
      loadIssuedBooks();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="mb-0">📚 Issued Books</h3>
            <div className="d-flex gap-2 mt-2 mt-sm-0">
              <button
                className="btn btn-light btn-sm fw-bold"
                onClick={handleDownloadPDF}
              >
                📥 Download PDF
              </button>
              <button
                className="btn btn-outline-light btn-sm fw-bold"
                onClick={handleExportCSV}
              >
                📊 Export CSV
              </button>
            </div>
          </div>

          <div className="card-body">

            {loading ? (
              <h5>Loading...</h5>
            ) : (

              <table className="table table-bordered table-hover">

                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>User</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                    <th>Fine</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {issuedBooks.map((issue) => (

                    <tr key={issue.id}>

                      <td>{issue.id}</td>

                      <td>{issue.book?.title}</td>

                      <td>{issue.user?.name}</td>

                      <td>{issue.issueDate}</td>

                      <td>

                        {editingId === issue.id ? (

                          <input
                            type="date"
                            className="form-control"
                            value={newDueDate}
                            onChange={(e) =>
                              setNewDueDate(e.target.value)
                            }
                          />

                        ) : (

                          issue.dueDate

                        )}

                      </td>

                      <td>{issue.returnDate || "-"}</td>

                      <td>
                        {issue.status === "ISSUED" ? (
                          (issue.fine > 0 || (issue.dueDate && new Date(issue.dueDate) < new Date(new Date().setHours(0,0,0,0)))) ? (
                            <span className="badge bg-danger">OVERDUE</span>
                          ) : (
                            <span className="badge bg-warning text-dark">ISSUED</span>
                          )
                        ) : (
                          <span className="badge bg-success">RETURNED</span>
                        )}
                      </td>

                      <td>
                        {issue.fine > 0 ? (
                          <span className="text-danger fw-bold">₹ {issue.fine}</span>
                        ) : (
                          <span className="text-success">₹ 0</span>
                        )}
                      </td>

                      <td>

                        {issue.status === "ISSUED" && (

                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleReturn(issue.id)}
                            >
                              Return
                            </button>

                            {editingId === issue.id ? (

                              <>
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={handleSave}
                                >
                                  Save
                                </button>

                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => setEditingId(null)}
                                >
                                  Cancel
                                </button>

                              </>

                            ) : (

                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEdit(issue)}
                              >
                                Edit Due Date
                              </button>

                            )}

                          </>

                        )}

                        {issue.status === "RETURNED" && (
                          <span className="text-success">
                            ✓ Returned
                          </span>
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default IssuedBooks;