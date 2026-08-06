import { FaBook, FaUser, FaBoxes } from "react-icons/fa";

function Dashboard({ books }) {
  return (
    <div className="row mb-4">

      <div className="col-md-4 mb-3">
        <div className="card bg-primary text-white shadow h-100">
          <div className="card-body text-center">
            <FaBook size={30} />
            <h5 className="mt-2">Titles</h5>
            <h2>{books.length}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card bg-success text-white shadow h-100">
          <div className="card-body text-center">
            <FaUser size={30} />
            <h5 className="mt-2">Authors</h5>
            <h2>{new Set(books.map((book) => book.author)).size}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card bg-warning text-white shadow h-100">
          <div className="card-body text-center">
            <FaBoxes size={30} />
            <h5 className="mt-2">Books in Stock</h5>
            <h2>
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