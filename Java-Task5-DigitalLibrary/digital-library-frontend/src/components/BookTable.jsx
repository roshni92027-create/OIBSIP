import { FaEdit, FaTrash, FaBook, FaPlus } from "react-icons/fa";

function BookTable({
  loading,
  currentBooks,
  darkMode,
  handleDelete,
  setEditBook,
  setShowForm,
}) {
  if (loading) {
    return (
      <div className="text-center my-5">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        <h5 className="mt-3 text-secondary">
          Loading Books...
        </h5>
      </div>
    );
  }

  return (
    <table
      className={`table table-hover table-bordered align-middle ${
        darkMode ? "table-dark" : ""
      }`}
    >
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.quantity}</td>

              <td>
                {book.quantity > 0 ? (
                  <span className="badge bg-success">
                    Available
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    Out of Stock
                  </span>
                )}
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditBook(book);
                    setShowForm(true);
                  }}
                >
                  <FaEdit className="me-1" />
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(book.id)}
                >
                  <FaTrash className="me-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">
              <div className="text-center py-5">

                <FaBook
                  size={70}
                  className="text-secondary mb-3"
                />

                <h3 className="fw-bold text-secondary">
                  No Books Found
                </h3>

                <p className="text-muted mb-4">
                  Your library is currently empty.
                  <br />
                  Click <strong>Add Book</strong> to add your first
                  book.
                </p>

                <button
                  className="btn btn-success"
                  onClick={() => setShowForm(true)}
                >
                  <FaPlus className="me-2" />
                  Add Your First Book
                </button>

              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default BookTable;