import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [editId, setEditId] = useState(null);


  // ================= FETCH BOOKS =================
  const fetchBooks = async () => {
    try {
      const res = await api.get("/books?page=1&limit=50");
      setBooks(res.data.books);
    } catch {
      toast.error("Failed to load books ❌");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  // ================= LOGOUT =================
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    toast.info("Logged out 👋");

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 800);
  };


  // ================= ADD / UPDATE =================
  const saveBook = async () => {
    try {
      const data = {
        title,
        author,
        price: Number(price),
        category,
        stock: Number(stock || 0),
      };

      if (editId) {
        await api.put(`/books/${editId}`, data);
        toast.success("Book updated successfully ✏️");
        setEditId(null);
      } else {
        await api.post("/books", data);
        toast.success("Book added successfully 📚");
      }

      // clear form
      setTitle("");
      setAuthor("");
      setPrice("");
      setCategory("");
      setStock("");

      fetchBooks();
    } catch {
      toast.error("Operation failed ❌");
    }
  };


  // ================= DELETE =================
  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      toast.success("Book deleted 🗑️");
      fetchBooks();
    } catch {
      toast.error("Delete failed ❌");
    }
  };


  // ================= EDIT =================
  const editBook = (book) => {
    setEditId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    setCategory(book.category || "");
    setStock(book.stock || 0);

    toast.info("Editing book ✏️");
  };


  return (
    <div className="container mt-5">

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>📚 Bookstore Dashboard</h1>

        <div>
          <Link to="/admin/orders" className="btn btn-dark me-2">
            📦 Orders
          </Link>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>


      {/* ================= FORM ================= */}
      <div className="card shadow-sm p-4 mb-4">
        <h4>{editId ? "Edit Book" : "Add Book"}</h4>

        <div className="row g-3 mt-2">

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="col-md-1 d-grid">
            <button
              className={`btn ${editId ? "btn-warning" : "btn-primary"}`}
              onClick={saveBook}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>

        </div>
      </div>


      {/* ================= TABLE ================= */}
      <div className="card shadow-sm p-4">

        <h4>Books List</h4>

        <table className="table table-striped table-bordered table-hover mt-3">

          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th width="150">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>₹{book.price}</td>
                <td>{book.category}</td>
                <td>{book.stock}</td>

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editBook(book)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;
