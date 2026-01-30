import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.jsx";

function AddEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    total_seats: "",
    price: "",
    img: null
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, img: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("date", form.date);
    formData.append("total_seats", form.total_seats);
    formData.append("price", form.price);
    if (form.img) formData.append("img", form.img);

    try {
      await API.post("/events", formData, {
        withCredentials: true 
      });

      alert("Event added successfully");
      navigate("/"); 

      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        total_seats: "",
        price: "",
        img: null
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error adding event");
    }
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              className="form-control"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              name="location"
              className="form-control"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date/Time</label>
            <input
              type="datetime-local"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Available Seats</label>
            <input
              type="number"
              name="total_seats"
              className="form-control"
              placeholder="Total Seats"
              value={form.total_seats}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 col-md-8">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                name="img"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-dark create-btn">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
