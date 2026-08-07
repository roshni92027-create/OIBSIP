import { useEffect, useState } from "react";
import {
  reserveBook,
  getReservations,
  cancelReservation,
} from "../services/ReservationService";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { FaBookmark, FaBook, FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function ReservationPage() {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const response = await getReservations();
      setReservations(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load reservations.");
    }
  };

  const handleReserve = async () => {
    if (!bookId || !userId) {
      toast.error("Please enter both Book ID and User ID.");
      return;
    }

    try {
      await reserveBook(bookId, userId);

      toast.success("Book Reserved Successfully!");

      setBookId("");
      setUserId("");

      loadReservations();

    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Reservation Failed";

      toast.error(message);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelReservation(id);

      toast.success("Reservation Cancelled");

      loadReservations();

    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Unable to Cancel Reservation";

      toast.error(message);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mt-4 mb-5">

        {/* Reserve Form Card */}
        <div className="card glass-card shadow-lg mb-4" style={{ borderRadius: "26px" }}>

          <div className="card-header card-header-gradient d-flex align-items-center gap-2 py-3">
            <FaBookmark className="fs-4 text-white" />
            <h3 className="mb-0 fs-4 fw-bold">Reserve Library Book</h3>
          </div>

          <div className="card-body p-4">

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary">
                  <FaBook className="me-2" /> Book ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Book ID"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary">
                  <FaUser className="me-2" /> User ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            </div>

            <button
              className="btn btn-purple-pink mt-3 fw-bold px-4"
              onClick={handleReserve}
            >
              <FaCheckCircle /> Reserve Book
            </button>

          </div>

        </div>

        {/* Reservations List Card */}
        <div className="card glass-card shadow-lg" style={{ borderRadius: "26px" }}>

          <div className="card-header card-header-gradient d-flex align-items-center gap-2 py-3">
            <FaBookmark className="fs-4 text-white" />
            <h3 className="mb-0 fs-4 fw-bold">Reservation List</h3>
          </div>

          <div className="card-body p-4">

            <div className="table-responsive">
              <table className="table align-middle">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No Reservations Found
                      </td>
                    </tr>
                  ) : (
                    reservations.map((reservation) => (
                      <tr key={reservation.id}>

                        <td className="fw-bold">{reservation.id}</td>

                        <td className="fw-semibold">{reservation.book?.title}</td>

                        <td>{reservation.user?.name}</td>

                        <td>{reservation.reservationDate}</td>

                        <td>
                          <span
                            className={`badge ${
                              reservation.status === "ACTIVE"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {reservation.status}
                          </span>
                        </td>

                        <td>
                          {reservation.status === "ACTIVE" ? (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleCancel(reservation.id)
                              }
                            >
                              <FaTimesCircle /> Cancel
                            </button>
                          ) : (
                            <span className="text-muted">
                              Cancelled
                            </span>
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

export default ReservationPage;