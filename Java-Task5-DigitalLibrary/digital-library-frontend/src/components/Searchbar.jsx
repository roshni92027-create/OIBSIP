import { FaSearch, FaUndo, FaPlus, FaFileCsv, FaFilePdf } from "react-icons/fa";
import { exportToCSV, exportToPDF } from "../utils/exportUtils";

function SearchBar({
  searchTitle,
  setSearchTitle,
  handleSearch,
  loadBooks,
  setCurrentPage,
  showForm,
  setShowForm,
  setEditBook,
  darkMode,
  books = [],
}) {
  const handleExportBooksCSV = () => {
    const headers = ["ID", "Title", "Author", "ISBN", "Quantity"];
    const rows = books.map((book) => [
      book.id,
      book.title,
      book.author,
      book.isbn,
      book.quantity,
    ]);
    exportToCSV("Books_Catalog.csv", headers, rows);
  };

  const handleExportBooksPDF = () => {
    const headers = ["ID", "Title", "Author", "ISBN", "Quantity"];
    const rows = books.map((book) => [
      book.id,
      book.title,
      book.author,
      book.isbn,
      book.quantity,
    ]);
    exportToPDF("Digital Library - Books Catalog", headers, rows, "Books_Catalog.pdf", `Total Books in Catalog: ${books.length}`);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

      <h3 className="mb-3 mb-md-0">Book List</h3>

      <div className="d-flex flex-wrap gap-2">

        <input
          className={`form-control ${
            darkMode ? "bg-secondary text-white border-light" : ""
          }`}
          style={{ width: "220px" }}
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleSearch}
        >
          <FaSearch className="me-1" />
          Search
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearchTitle("");
            loadBooks();
            setCurrentPage(1);
          }}
        >
          <FaUndo className="me-1" />
          Reset
        </button>

        <button
          className="btn btn-outline-success"
          onClick={handleExportBooksCSV}
          title="Export Books to Excel/CSV"
        >
          <FaFileCsv className="me-1" />
          Export CSV
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={handleExportBooksPDF}
          title="Download Books Catalog PDF"
        >
          <FaFilePdf className="me-1" />
          Export PDF
        </button>

        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(!showForm);

            if (showForm) {
              setEditBook(null);
            }
          }}
        >
          <FaPlus className="me-1" />
          {showForm ? "Close" : "Add Book"}
        </button>

      </div>

    </div>
  );
}

export default SearchBar;