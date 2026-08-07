import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import {
  getIssuedBooks,
  payFine,
} from "../services/IssuedBookService";
import { exportToPDF, exportToCSV } from "../utils/exportUtils";
import { FaCoins, FaFilePdf, FaFileCsv, FaCheckCircle } from "react-icons/fa";

function FineManagement() {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    loadIssuedBooks();
  }, []);

  const loadIssuedBooks = async () => {
    try {
      const response = await getIssuedBooks();
      setIssuedBooks(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load issued books.");
    }
  };

  const handlePayFine = async (issueId) => {
    try {
      await payFine(issueId);
      toast.success("Fine marked as paid.");
      loadIssuedBooks();
    } catch (error) {
      console.error(error);
      toast.error("Unable to mark fine as paid.");
    }
  };

  const handleDownloadPDF = () => {
    const totalFine = issuedBooks.reduce((sum, b) => sum + (b.fine || 0), 0);
    const headers = ["ID", "Book Title", "User Name", "Status", "Fine", "Payment Status"];
    const rows = issuedBooks.map((issue) => [
      issue.id,
      issue.book?.title || "-",
      issue.user?.name || "-",
      issue.status,
      `Rs ${issue.fine}`,
      issue.finePaid ? "Paid" : issue.fine > 0 ? "Unpaid" : "N/A",
    ]);
    exportToPDF(
      "Digital Library - Fine Management Report",
      headers,
      rows,
      "Fine_Report.pdf",
      `Total Accumulated Fine: Rs ${totalFine} | Total Records: ${issuedBooks.length}`
    );
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Book Title", "User Name", "Status", "Fine Amount", "Payment Status"];
    const rows = issuedBooks.map((issue) => [
      issue.id,
      issue.book?.title || "-",
      issue.user?.name || "-",
      issue.status,
      issue.fine,
      issue.finePaid ? "Paid" : issue.fine > 0 ? "Unpaid" : "N/A",
    ]);
    exportToCSV("Fine_Report.csv", headers, rows);
  };

  return (
    <>
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mt-4 mb-5">

        <div className="card glass-card shadow-lg" style={{ borderRadius: "26px" }}>

          <div className="card-header card-header-gradient d-flex justify-content-between align-items-center flex-wrap gap-2 py-3">
            <div className="d-flex align-items-center gap-2">
              <FaCoins className="fs-4 text-white" />
              <h3 className="mb-0 fs-4 fw-bold">Fine Management</h3>
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

            <div className="table-responsive">
              <table className="table align-middle">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Fine</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {issuedBooks.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No Records Found
                      </td>
                    </tr>
                  ) : (
                    issuedBooks.map((issue) => (
                      <tr key={issue.id}>

                        <td className="fw-bold">{issue.id}</td>

                        <td className="fw-semibold">
                          {issue.book?.title}
                        </td>

                        <td>
                          {issue.user?.name}
                        </td>

                        <td>

                          {issue.status === "RETURNED" ? (
                            <span className="badge bg-success">
                              RETURNED
                            </span>
                          ) : issue.fine > 0 ? (
                            <span className="badge bg-danger">
                              OVERDUE
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              ISSUED
                            </span>
                          )}

                        </td>

                        <td>

                          {issue.fine > 0 ? (
                            <span className="text-danger fw-bold">
                              ₹{issue.fine}
                            </span>
                          ) : (
                            <span className="text-success fw-bold">
                              ₹0
                            </span>
                          )}

                        </td>

                        <td>
                          {issue.finePaid ? (
                            <span className="badge bg-success">
                              Paid
                            </span>
                          ) : issue.fine > 0 ? (
                            <span className="badge bg-danger">
                              Unpaid
                            </span>
                          ) : (
                            <span className="badge bg-secondary">
                              N/A
                            </span>
                          )}
                        </td>

                        <td>

                          {!issue.finePaid &&
                          issue.fine > 0 ? (

                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handlePayFine(issue.id)
                              }
                            >
                              Mark as Paid
                            </button>

                          ) : (

                            <button
                              className="btn btn-secondary btn-sm"
                              disabled
                            >
                              <FaCheckCircle /> Completed
                            </button>

                          )}

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default FineManagement;