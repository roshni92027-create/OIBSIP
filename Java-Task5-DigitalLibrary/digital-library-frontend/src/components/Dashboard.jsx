import { FaBook, FaUser, FaBoxes } from "react-icons/fa";

function Dashboard({ books }) {
  return (
    <div className="row mb-4 g-3">

      <div className="col-md-4">
        <div className="card stat-card stat-card-1 h-100 p-2">
          <div className="card-body text-center">
            <FaBook size={32} className="mb-2 opacity-90" />
            <h6 className="text-uppercase fw-bold opacity-75 mb-1" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Unique Titles</h6>
            <h2 className="display-6 fw-extrabold mb-0">{books.length}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card stat-card stat-card-2 h-100 p-2">
          <div className="card-body text-center">
            <FaUser size={32} className="mb-2 opacity-90" />
            <h6 className="text-uppercase fw-bold opacity-75 mb-1" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Distinct Authors</h6>
            <h2 className="display-6 fw-extrabold mb-0">{new Set(books.map((book) => book.author)).size}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card stat-card stat-card-3 h-100 p-2">
          <div className="card-body text-center">
            <FaBoxes size={32} className="mb-2 opacity-90" />
            <h6 className="text-uppercase fw-bold opacity-75 mb-1" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Total Stock Count</h6>
            <h2 className="display-6 fw-extrabold mb-0">
              {books.reduce(
                (sum, book) => sum + Number(book.quantity),
                0
              )}
            </h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;