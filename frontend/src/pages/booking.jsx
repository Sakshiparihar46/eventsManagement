import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    quantity: 1
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await API.post("/bookings", {
        event_id: id,
        ...form
      });

      alert("Booking Successful");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
    <form onSubmit={handleSubmit}>
      <h2>Book Event</h2>
      <div class="mb-3"><label for="Name" className="form-lable">Name</label>
      <input name="name"  className="form-control"  placeholder="Name" onChange={handleChange} required /></div>
      <div class="mb-3"> <label for="Email" className="form-lable" >Email</label>
      <input name="email"  className="form-control"  placeholder="Email" onChange={handleChange} required /></div>
      <div class="mb-3"> <label for="Mobile" className="form-lable" >Phone_No</label>
      <input name="mobile"  className="form-control"  placeholder="Mobile" onChange={handleChange} required /></div>
      <div class="mb-3"> <label for="quantity" className="form-lable" >no of seats</label>
      <input name="quantity"  className="form-control"  type="number" min="1" onChange={handleChange} /></div>

      <button type="submit" className="btn btn-dark create-btn">Confirm Booking</button>
    </form></div>
    </div>
  );
}

export default Booking;

