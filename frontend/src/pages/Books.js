import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // ⭐ pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { addToCart, cart } = useCart();


  // ================= FETCH BOOKS WITH PAGINATION =================
  const fetchBooks = async (pageNo = 1) => {
    try {
      const res = await api.get(`/books?page=${pageNo}&limit=8`);

      setBooks(res.data.books);          // backend sends books array
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };


  // fetch whenever page changes
  useEffect(() => {
    fetchBooks(page);
  }, [page]);


  // ================= SEARCH =================
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
          <Link to="/cart" className="btn btn-success me-2">
            🛒 Cart ({cart.length})
          </Link>

          <Link to="/login" className="btn btn-dark">
            Admin Login
          </Link>
        </div>
      </div>


      {/* Search */}
      <input
        className="form-control mb-4"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* Books Grid */}
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


      {/* ================= PAGINATION UI ================= */}
      <div className="d-flex justify-content-center mt-4 gap-3">

        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Books;
