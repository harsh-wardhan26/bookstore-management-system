import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);


  // ================= AUTO REDIRECT =================
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const role =
      localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token && role) {
      if (role.toLowerCase() === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);


  // ================= LOGIN =================
  const login = async () => {
    try {
      setLoading(true);

      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data.token;
      const role = res.data.role?.toLowerCase();

      if (!token || !role) {
        toast.error("Invalid server response ❌");
        return;
      }

      // Save token + role
      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
      }

      toast.success("Login successful 🎉");

      // small delay so user sees toast
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 800);

    } catch {
      toast.error("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "380px", borderRadius: "14px" }}
      >
        <h3 className="text-center mb-4">🔐 Admin Login</h3>

        {/* Email */}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="input-group mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Remember */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label className="form-check-label">Remember me</label>
        </div>

        {/* Login button */}
        <button
          className="btn btn-dark w-100"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
