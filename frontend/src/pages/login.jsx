import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", form, { withCredentials: true });
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
     <div className="col-6 offset-3">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div class="mb-3"><label for="email" className="form-lable">Email</label>
        <input name="email" className="form-control"  placeholder="Email" onChange={handleChange} required /></div>
        <div class="mb-3"><label for="title" className="form-lable">password</label>
        <input type="password" className="form-control"  name="password" placeholder="Password" onChange={handleChange} required /></div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
