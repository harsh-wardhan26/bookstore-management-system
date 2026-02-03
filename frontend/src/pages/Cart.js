import { useCart } from "../context/CartContext";
import api from "../services/api";

function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart();

  const checkout = async () => {
    try {
      await api.post("/orders", {
        items: cart,
        totalPrice,
      });

      alert("Order placed successfully 🎉");

      window.location.href = "/";
    } catch (err) {
      alert("Login required to checkout");
    }
  };

  return (
    <div className="container mt-5">

      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price * item.qty}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ₹{totalPrice}</h4>

          <button
            className="btn btn-success mt-2"
            onClick={checkout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
