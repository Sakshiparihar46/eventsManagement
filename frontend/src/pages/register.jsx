import { useState } from "react";
import API from "../services/api.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register.jsx", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="col-6 offset-3">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <div class="mb-3"><label for="name" className="form-lable">Name</label>
        <input name="name" className="form-control"  placeholder="Full Name" onChange={handleChange} required /></div>
        <div class="mb-3"><label for="email" className="form-lable">Email</label>
        <input name="email" className="form-control"  placeholder="Email" onChange={handleChange} required /></div>
        <div class="mb-3"><label for="title" className="form-lable">password</label>
        <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} required /></div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
