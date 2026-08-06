import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import SearchBar from "../components/Searchbar";
import Pagination from "../components/Pagination";

import {
  getBooks,
  deleteBook,
  searchBooks,
} from "../services/BookService";

import { getDashboard } from "../services/DashboardService";

function LibraryDashboard() {

  // -------------------------------
  // Dashboard Statistics
  // -------------------------------

  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    availableBooks: 0,
    issuedBooks: 0,
    reservedBooks: 0,
    totalUsers: 0,
  });

  // -------------------------------
  // Books
  // -------------------------------

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Search
  // -------------------------------

  const [searchTitle, setSearchTitle] = useState("");

  // -------------------------------
  // Pagination
  // -------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 5;

  // -------------------------------
  // Form
  // -------------------------------

  const [showForm, setShowForm] = useState(false);

  const [editBook, setEditBook] = useState(null);

  // -------------------------------
  // Theme
  // -------------------------------

  const [darkMode, setDarkMode] = useState(false);

  // -------------------------------
  // Load Initial Data
  // -------------------------------

  useEffect(() => {

    loadBooks();

    loadDashboard();

  }, []);

  // -------------------------------
  // Dashboard API
  // -------------------------------

  const loadDashboard = async () => {

    try {

      const response = await getDashboard();

      setDashboardData(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load dashboard.");

    }

  };

  // -------------------------------
  // Books API
  // -------------------------------

  const loadBooks = async () => {

    try {

      setLoading(true);

      const response = await getBooks();

      setBooks(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load books.");

    } finally {

      setLoading(false);

    }

  };

  // -------------------------------
  // Search Books
  // -------------------------------

  const handleSearch = async () => {

    if (searchTitle.trim() === "") {

      loadBooks();

      return;

    }

    try {

      const response = await searchBooks(searchTitle);

      setBooks(response.data);

      setCurrentPage(1);

    } catch (error) {

      console.error(error);

      toast.error("Search failed.");

    }

  };

  // -------------------------------
  // Delete Book
  // -------------------------------

  const handleDelete = async (id) => {

    // if (!window.confirm("Delete this book?")) return;

    try {

      await deleteBook(id);

      toast.success("Book deleted.");

      loadBooks();

      loadDashboard();

    } catch (error) {

      console.error(error);

      toast.error("Delete failed.");

    }

  };

  // -------------------------------
  // Pagination Logic
  // -------------------------------

  const indexOfLastBook = currentPage * booksPerPage;

  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const currentBooks = books.slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  const totalPages = Math.ceil(
    books.length / booksPerPage
  );
  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light"
      }`}
    >
      <div className="container py-4">

        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">

          <div>
            <h2 className="fw-bold">
              📚 Digital Library Dashboard
            </h2>

            <p className="text-muted">
              Welcome to your Library Management System
            </p>
          </div>

          <button
            className={`btn ${
              darkMode
                ? "btn-light"
                : "btn-dark"
            }`}
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀ Light Mode"
              : "🌙 Dark Mode"}
          </button>

        </div>

        {/* Dashboard Statistics */}

        <div className="row mb-4">

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 bg-primary text-white">

              <div className="card-body text-center">

                <h5>Total Books</h5>

                <h2>{dashboardData.totalBooks}</h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 bg-success text-white">

              <div className="card-body text-center">

                <h5>Available</h5>

                <h2>{dashboardData.availableBooks}</h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 bg-warning text-dark">

              <div className="card-body text-center">

                <h5>Issued</h5>

                <h2>{dashboardData.issuedBooks}</h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 bg-danger text-white">

              <div className="card-body text-center">

                <h5>Users</h5>

                <h2>{dashboardData.totalUsers}</h2>

              </div>

            </div>

          </div>

        </div>

        {/* Existing Dashboard Component */}

        <Dashboard books={books} />

        {/* Search Bar */}

        <SearchBar
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          handleSearch={handleSearch}
          loadBooks={loadBooks}
          setCurrentPage={setCurrentPage}
          showForm={showForm}
          setShowForm={setShowForm}
          setEditBook={setEditBook}
          darkMode={darkMode}
          books={books}
        />

        {/* Book Form */}

        {showForm && (

          <BookForm
            loadBooks={() => {
              loadBooks();
              loadDashboard();
            }}
            editBook={editBook}
            clearEdit={() => setEditBook(null)}
          />

        )}
            {/* Book Table */}

            <div className="card shadow border-0">

              <div className="card-body">

                <BookTable
                  loading={loading}
                  currentBooks={currentBooks}
                  darkMode={darkMode}
                  handleDelete={handleDelete}
                  setEditBook={setEditBook}
                  setShowForm={setShowForm}
                />

              </div>

            </div>

            {/* Pagination */}

            {books.length > booksPerPage && (

              <div className="d-flex justify-content-center mt-4">

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />

              </div>

            )}

            {/* Footer */}

            <Footer darkMode={darkMode} />

          </div>
        </div>
      );

    }

    export default LibraryDashboard;