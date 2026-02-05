import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role =
    localStorage.getItem("role") || sessionStorage.getItem("role");

  if (!role || role.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
