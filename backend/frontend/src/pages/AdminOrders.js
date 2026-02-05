import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markDelivered = async (id) => {
    await api.put(`/orders/${id}`, { status: "Delivered" });
    fetchOrders();
  };

  return (
    <div className="container mt-5">

      <h2>📦 Orders Management</h2>

      <table className="table table-bordered table-hover mt-4">

        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th width="120">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>

              <td>{order.user?.email}</td>

              <td>
                {order.items.map((i, idx) => (
                  <div key={idx}>
                    {i.title} x {i.qty}
                  </div>
                ))}
              </td>

              <td>₹{order.totalPrice}</td>

              <td>
                <span
                  className={`badge ${
                    order.status === "Delivered"
                      ? "bg-success"
                      : "bg-warning"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td>
                {order.status !== "Delivered" && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => markDelivered(order._id)}
                  >
                    Deliver
                  </button>
                )}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default AdminOrders;
