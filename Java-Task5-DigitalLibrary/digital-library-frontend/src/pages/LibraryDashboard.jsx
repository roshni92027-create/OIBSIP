import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaBook, 
  FaUsers, 
  FaBookOpen, 
  FaBookmark, 
  FaCommentAlt, 
  FaCoins, 
  FaPlus, 
  FaSignOutAlt, 
  FaSun, 
  FaMoon, 
  FaUserCircle, 
  FaCompass
} from "react-icons/fa";

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
  const navigate = useNavigate();

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
  // Theme (Persisted in localStorage)
  // -------------------------------

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("bg-dark");
    } else {
      document.body.classList.remove("bg-dark");
    }
  }, [darkMode]);

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
      setLoading(true);
      const response = await searchBooks(searchTitle);
      setBooks(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      toast.error("Book not found.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Delete Book
  // -------------------------------

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Book Deleted Successfully!");
      loadBooks();
      loadDashboard();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // -------------------------------
  // Pagination Logic
  // -------------------------------

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const loggedInUserObj = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = loggedInUserObj.name || "Administrator";

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : ""}`}>
      <div className="container py-4">

        {/* Glass Navbar */}
        <nav className="navbar navbar-expand-lg glass-navbar my-2">
          <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap gap-3">
            <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/dashboard">
              <div className="bg-gradient p-2 rounded-3 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                <FaBookOpen className="fs-4" />
              </div>
              <span className="text-gradient fs-4 fw-extrabold">Digital Library</span>
            </Link>

            <div className="d-flex flex-wrap gap-2 align-items-center">
              <div className={`d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill me-1 ${darkMode ? "bg-white bg-opacity-10 border border-white border-opacity-10 text-light" : "bg-dark bg-opacity-10 border border-dark border-opacity-10 text-dark"}`}>
                <FaUserCircle className="fs-5" style={{ color: '#7c3aed' }} />
                <span className="fw-semibold small">{userName}</span>
              </div>

              <button
                className={`btn btn-sm px-3 ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <><FaSun className="text-warning" /> Light</> : <><FaMoon className="text-primary" /> Dark</>}
              </button>

              <button
                className="btn btn-sm btn-danger px-3 ms-1"
                onClick={logout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Welcome Section / Hero Banner */}
        <div 
          className="p-4 p-md-5 mb-4 shadow-lg welcome-hero-card"
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 70%, #6366f1 100%)',
            color: '#ffffff',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-white bg-opacity-20 text-white border border-white border-opacity-25 px-3 py-1 fw-semibold">
                  SaaS Workspace
                </span>
                <span className="text-white-50 small fw-medium">Live Overview</span>
              </div>
              <h1 className="display-6 fw-extrabold text-white mb-2" style={{ color: '#ffffff' }}>
                Welcome Back 👋
              </h1>
              <p className="text-white opacity-90 fs-5 mb-0 fw-medium" style={{ color: '#ffffff' }}>
                Manage your digital library efficiently. Explore real-time metrics, member transactions, and book catalog operations.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button 
                className="btn py-2.5 px-4 fw-bold fs-6 shadow-lg text-white"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', border: 'none', borderRadius: '16px' }}
                onClick={() => {
                  setEditBook(null);
                  setShowForm(!showForm);
                }}
              >
                <FaPlus /> {showForm ? "Close Form" : "Add New Book"}
              </button>
            </div>
          </div>
        </div>

        {/* 6 Statistic Cards Grid */}
        <div className="row mb-4 g-3">

          {/* 1. Total Books */}
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div 
              className="stat-card h-100 p-3 text-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#ffffff', borderRadius: '20px' }}
            >
              <FaBook size={28} className="mb-2 text-white" />
              <h6 className="text-uppercase fw-bold text-white opacity-90 mb-1" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>Total Books</h6>
              <h2 className="display-6 fw-extrabold text-white mb-0">{dashboardData.totalBooks}</h2>
            </div>
          </div>

          {/* 2. Total Users */}
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div 
              className="stat-card h-100 p-3 text-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)', color: '#ffffff', borderRadius: '20px' }}
            >
              <FaUsers size={28} className="mb-2 text-white" />
              <h6 className="text-uppercase fw-bold text-white opacity-90 mb-1" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>Total Users</h6>
              <h2 className="display-6 fw-extrabold text-white mb-0">{dashboardData.totalUsers}</h2>
            </div>
          </div>

          {/* 3. Issued Books */}
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div 
              className="stat-card h-100 p-3 text-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', color: '#ffffff', borderRadius: '20px' }}
            >
              <FaBookOpen size={28} className="mb-2 text-white" />
              <h6 className="text-uppercase fw-bold text-white opacity-90 mb-1" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>Issued Books</h6>
              <h2 className="display-6 fw-extrabold text-white mb-0">{dashboardData.issuedBooks}</h2>
            </div>
          </div>

          {/* 4. Reservations */}
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div 
              className="stat-card h-100 p-3 text-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: '#ffffff', borderRadius: '20px' }}
            >
              <FaBookmark size={28} className="mb-2 text-white" />
              <h6 className="text-uppercase fw-bold text-white opacity-90 mb-1" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>Reservations</h6>
              <h2 className="display-6 fw-extrabold text-white mb-0">{dashboardData.reservedBooks || 0}</h2>
            </div>
          </div>

          {/* 5. Contact Messages */}
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div 
              className="stat-card h-100 p-3 text-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', color: '#ffffff', borderRadius: '20px' }}
            >
              <FaCommentAlt size={28} className="mb-2 text-white" />
              <h6 className="text-uppercase fw-bold text-white opacity-90 mb-1" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>Messages</h6>
              <h2 className="display-6 fw-extrabold text-white mb-0">Active</h2>
            </div>
          </div>

          {/* 6. Fine Management */}
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div 
              className="stat-card h-100 p-3 text-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)', color: '#ffffff', borderRadius: '20px' }}
            >
              <FaCoins size={28} className="mb-2 text-white" />
              <h6 className="text-uppercase fw-bold text-white opacity-90 mb-1" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>Fine System</h6>
              <h2 className="display-6 fw-extrabold text-white mb-0">Active</h2>
            </div>
          </div>

        </div>

        {/* Quick Actions Bar */}
        <div className="mb-4">
          <h5 className={`fw-bold mb-3 d-flex align-items-center gap-2 ${darkMode ? "text-white" : "text-dark"}`}>
            <FaCompass className="text-primary" /> Quick Actions
          </h5>
          <div className="row g-3">
            <div className="col-lg-2 col-md-4 col-6">
              <div 
                className="quick-action-card"
                onClick={() => {
                  setEditBook(null);
                  setShowForm(true);
                }}
              >
                <div 
                  className="action-icon-box"
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff' }}
                >
                  <FaPlus />
                </div>
                <span>Add Book</span>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <Link to="/issue-book" className="quick-action-card text-decoration-none">
                <div 
                  className="action-icon-box" 
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', color: '#ffffff' }}
                >
                  <FaBookOpen />
                </div>
                <span>Issue Book</span>
              </Link>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <Link to="/issued-books" className="quick-action-card text-decoration-none">
                <div 
                  className="action-icon-box" 
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)', color: '#ffffff' }}
                >
                  <FaBook />
                </div>
                <span>Issued Books</span>
              </Link>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <Link to="/reservations" className="quick-action-card text-decoration-none">
                <div 
                  className="action-icon-box" 
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: '#ffffff' }}
                >
                  <FaBookmark />
                </div>
                <span>Reservations</span>
              </Link>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <Link to="/contact-messages" className="quick-action-card text-decoration-none">
                <div 
                  className="action-icon-box" 
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', color: '#ffffff' }}
                >
                  <FaCommentAlt />
                </div>
                <span>Messages</span>
              </Link>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <Link to="/fine-management" className="quick-action-card text-decoration-none">
                <div 
                  className="action-icon-box" 
                  style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)', color: '#ffffff' }}
                >
                  <FaCoins />
                </div>
                <span>Fines</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Existing Secondary Metrics Component */}
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

        {/* Book Form (Collapsible Modal/Card) */}
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

        {/* Recent Activity / Book Catalog Table */}
        <div className="card glass-card shadow-lg mb-4">
          <div className="card-header card-header-gradient d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0 fs-5 fw-bold d-flex align-items-center gap-2 text-white">
              <FaBook className="text-white" /> Recent Catalog Activity
            </h4>
            <span className="badge rounded-pill bg-white bg-opacity-25 text-white px-3 py-1">
              {books.length} Catalog Items
            </span>
          </div>

          <div className="card-body p-4">
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