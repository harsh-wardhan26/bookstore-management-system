import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const { addToCart, cart } = useCart();

  const fetchBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">

      {/* Top bar */}
      <div className="d-flex justify-content-between mb-4">
        <h2>📚 Book Store</h2>

        <div>
          {/* ✅ IMPORTANT */}
          <Link to="/cart" className="btn btn-success me-2">
            🛒 Cart ({cart.length})
          </Link>

          <Link to="/login" className="btn btn-dark">
            Admin Login
          </Link>
        </div>
      </div>

      <input
        className="form-control mb-4"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredBooks.map((book) => (
          <div key={book._id} className="col-md-3 mb-4">
            <div className="card p-3 h-100 d-flex flex-column">
              <h5>{book.title}</h5>
              <p>{book.author}</p>
              <h6>₹{book.price}</h6>

              <button
                className="btn btn-primary mt-auto"
                onClick={() => addToCart(book)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Books;
