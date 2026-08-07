import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import {
  getIssuedBooks,
  returnBook,
  updateDueDate,
} from "../services/IssuedBookService";
import { exportToPDF, exportToCSV } from "../utils/exportUtils";
import { FaBookOpen, FaFilePdf, FaFileCsv, FaUndo, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

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
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mt-4 mb-5">

        <div className="card glass-card shadow-lg" style={{ borderRadius: "26px" }}>

          <div className="card-header card-header-gradient d-flex justify-content-between align-items-center flex-wrap gap-2 py-3">
            <div className="d-flex align-items-center gap-2">
              <FaBookOpen className="fs-4 text-white" />
              <h3 className="mb-0 fs-4 fw-bold">Issued Library Books</h3>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-light btn-sm fw-bold shadow-sm"
                onClick={handleDownloadPDF}
              >
                <FaFilePdf className="text-danger" /> Download PDF
              </button>
              <button
                className="btn btn-outline-light btn-sm fw-bold"
                onClick={handleExportCSV}
              >
                <FaFileCsv className="text-success" /> Export CSV
              </button>
            </div>
          </div>

          <div className="card-body p-4">

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <h5 className="mt-3 text-secondary">Loading Issued Books...</h5>
              </div>
            ) : (

              <div className="table-responsive">
                <table className="table align-middle">

                  <thead>
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

                        <td className="fw-bold">{issue.id}</td>

                        <td className="fw-semibold">{issue.book?.title}</td>

                        <td>{issue.user?.name}</td>

                        <td>{issue.issueDate}</td>

                        <td>

                          {editingId === issue.id ? (

                            <input
                              type="date"
                              className="form-control form-control-sm"
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
                            <span className="text-success fw-bold">₹ 0</span>
                          )}
                        </td>

                        <td>

                          {issue.status === "ISSUED" && (

                            <div className="d-flex gap-1 flex-wrap">
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleReturn(issue.id)}
                              >
                                <FaUndo /> Return
                              </button>

                              {editingId === issue.id ? (

                                <>
                                  <button
                                    className="btn btn-primary btn-sm"
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
                                  <FaCalendarAlt /> Edit Due
                                </button>

                              )}

                            </div>

                          )}

                          {issue.status === "RETURNED" && (
                            <span className="text-success fw-bold d-inline-flex align-items-center gap-1">
                              <FaCheckCircle /> Returned
                            </span>
                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default IssuedBooks;