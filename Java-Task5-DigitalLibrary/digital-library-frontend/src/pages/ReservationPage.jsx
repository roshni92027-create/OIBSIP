import { useEffect, useState } from "react";
import {
  reserveBook,
  getReservations,
  cancelReservation,
} from "../services/ReservationService";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";

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

      <div className="container mt-4">

        <div className="card shadow mb-4">

          <div className="card-header bg-primary text-white">
            <h3>📚 Reserve Book</h3>
          </div>

          <div className="card-body">

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />

            <button
              className="btn btn-success"
              onClick={handleReserve}
            >
              Reserve Book
            </button>

          </div>

        </div>

        <div className="card shadow">

          <div className="card-header bg-dark text-white">
            <h3>Reservation List</h3>
          </div>

          <div className="card-body">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">

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
                    <td colSpan="6" className="text-center">
                      No Reservations Found
                    </td>
                  </tr>
                ) : (
                  reservations.map((reservation) => (
                    <tr key={reservation.id}>

                      <td>{reservation.id}</td>

                      <td>{reservation.book?.title}</td>

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
                            Cancel
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
    </>
  );
}

export default ReservationPage;