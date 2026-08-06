import { useEffect, useState } from "react";
import { addBook, updateBook } from "../services/BookService";
import { toast } from "react-toastify";
import { FaBook, FaSave, FaTimes } from "react-icons/fa";

function BookForm({ loadBooks, editBook, clearEdit }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    if (editBook) {
      setBook(editBook);
    } else {
      resetForm();
    }
  }, [editBook]);

  const resetForm = () => {
    setBook({
      title: "",
      author: "",
      isbn: "",
      category: "",
      quantity: "",
    });
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !book.title.trim() ||
      !book.author.trim() ||
      !book.isbn.trim() ||
      !book.category.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (Number(book.quantity) < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    try {
      if (editBook) {
        await updateBook(editBook.id, book);
        toast.success("Book updated successfully!");
      } else {
        await addBook(book);
        toast.success("Book added successfully!");
      }

      resetForm();
      clearEdit();
      loadBooks();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          <FaBook className="me-2" />
          {editBook ? "Edit Book" : "Add New Book"}
        </h4>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="author"
            placeholder="Author Name"
            value={book.author}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="isbn"
            placeholder="ISBN Number"
            value={book.isbn}
            onChange={handleChange}
            required
          />

          <select
            className="form-select mb-3"
            name="category"
            value={book.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Programming">Programming</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="History">History</option>
            <option value="Novel">Novel</option>
            <option value="Biography">Biography</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>

          <input
            className="form-control mb-4"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={book.quantity}
            onChange={handleChange}
            min="1"
            required
          />

          <div className="d-flex gap-2">

            <button
              type="submit"
              className="btn btn-success"
            >
              <FaSave className="me-2" />
              {editBook ? "Update Book" : "Save Book"}
            </button>

            {editBook && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  clearEdit();
                  resetForm();
                }}
              >
                <FaTimes className="me-2" />
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>
    </div>
  );
}

export default BookForm;