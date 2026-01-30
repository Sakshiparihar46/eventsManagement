import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api.jsx";

function UpdateEvent() {
  const { id } = useParams();
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

  
  useEffect(() => {
    API.get(`/events/${id}`)
      .then(res => {
        setForm({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          date: res.data.date?.slice(0, 16),
          total_seats: res.data.total_seats,
          price: res.data.price,
          img: null 
        });
      })
      .catch(err => console.log(err));
  }, [id]);


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

    if (form.img) {
      formData.append("img", form.img);
    }

    try {
      await API.put(`/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Event updated successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error updating event");
    }
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
      <h2>Update Event</h2>

      <form onSubmit={handleSubmit}>
        <div class="mb-3"><label for="title" className="form-lable">Title</label>
        <input name="title"  className="form-control" value={form.title} onChange={handleChange} required /></div>
        <div class="mb-3"> <label for="discription" className="form-lable" >discription</label>
        <textarea name="description"  className="form-control" value={form.description} onChange={handleChange} required /></div>
         <div><label for="location" className="form-lable">location</label>
        <input name="location"  className="form-control" value={form.location} onChange={handleChange} required /></div>
        <div><label for="date" className="form-lable">date/time</label>
        <input type="datetime-local"  className="form-control" name="date" value={form.date} onChange={handleChange} required /></div>
        <div><label for="total_seats" className="form-lable">available seats</label>
        <input type="number"  className="form-control" name="total_seats" value={form.total_seats} onChange={handleChange} required /></div>
        <div class="mb-3 col-md-4"><label for="price" class="form-lable">price</label>
        <input type="number"  className="form-control" name="price" value={form.price} onChange={handleChange} required />
        </div>
         <div class="mb-3 col-md-8"><label for="upload new image" class="form-lable">upload new image</label>
        <input type="file"  className="form-control" name="img" onChange={handleChange} /></div>

        <button type="submit" className="btn btn-dark create-btn">Update Event</button>
      </form>
    </div></div>
  );
}

export default UpdateEvent;



