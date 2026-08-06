import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import {
  getIssuedBooks,
  payFine,
} from "../services/IssuedBookService";
import { exportToPDF, exportToCSV } from "../utils/exportUtils";

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

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="mb-0">💰 Fine Management</h3>
            <div className="d-flex gap-2 mt-2 mt-sm-0">
              <button
                className="btn btn-light btn-sm fw-bold"
                onClick={handleDownloadPDF}
              >
                📥 Download Fine Report (PDF)
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

            <table className="table table-bordered table-hover">

              <thead className="table-dark">
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
                    <td colSpan="7" className="text-center">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  issuedBooks.map((issue) => (
                    <tr key={issue.id}>

                      <td>{issue.id}</td>

                      <td>
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
                          <span className="text-success">
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
                            Completed
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
    </>
  );
}

export default FineManagement;