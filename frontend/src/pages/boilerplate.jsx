import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Boilerplate({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    API.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await API.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <header className="head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#333", color: "white" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "25px" }}>@SkyDive</Link>
        <nav>
          <Link to="/" style={{ color: "white", marginLeft: "-450px" }}>Explore</Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {user?.role === "admin" && (
            <Link to="/admin/add-event" className="btn btn-info">
              Add Event
            </Link>
          )}

          {user ? (
            <>
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <> <div className="head">
              <Link to="/login" style={{ color: "white" }}>Login</Link>
              <Link to="/register" style={{ color: "white" }}>Signup</Link></div>
            </>
          )}
        </div>
      </header>
          <div className="inner-container">
      <main>{children}</main></div>

      <footer style={{ textAlign: "center", padding: "10px", backgroundColor: "#333", color: "white", marginTop: "auto" }}>
        <p>&copy; 2023 Event Management System</p>
      </footer>
    </div>
  );
}

export default Boilerplate;


