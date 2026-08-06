import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LibraryDashboard from "./pages/LibraryDashboard";
import IssueBook from "./pages/IssueBook";
import IssuedBooks from "./pages/IssuedBooks";
import ReservationPage from "./pages/ReservationPage";
import ContactPage from "./pages/ContactPage";
import ContactMessages from "./pages/ContactMessages";
import FineManagement from "./pages/FineManagement";

function App() {

  const loggedInUser = localStorage.getItem("user");

  return (
    <Routes>

      <Route
        path="/"
        element={
          loggedInUser
            ? <Navigate to="/dashboard" />
            : <Navigate to="/login" />
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          loggedInUser
            ? <LibraryDashboard />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/issue-book"
        element={
          loggedInUser
            ? <IssueBook />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/issued-books"
        element={
          loggedInUser
            ? <IssuedBooks />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/reservations"
        element={
          loggedInUser
            ? <ReservationPage />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/contact"
        element={
          loggedInUser
            ? <ContactPage />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/contact-messages"
        element={
          loggedInUser
            ? <ContactMessages />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/fine-management"
        element={
          loggedInUser
            ? <FineManagement />
            : <Navigate to="/login" />
        }
      />

    </Routes>
  );
}

export default App;