import { Link, useNavigate } from "react-router-dom";
import "./events.css";
import { useEffect, useState } from "react";
import API from "../services/api.jsx";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchUser();
  }, []);

 
  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await API.delete(`/events/${id}`);
      alert("Event deleted");
      fetchEvents();
    } catch (err) {
  console.log("DELETE ERROR:", err.response);

  alert(
    err.response?.data?.message ||
    "you are not the author of this event"
  );
}

  };

  return (
    <div className="event-card">
      <h2>Events</h2>

      <div className="card-grid row mt-2">
        {events.map((event) => (
          <div
            className="card"
            key={event.id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
          >
            <div className="card-img-top">
              <img
                src={event.img}
                alt={event.title}
                style={{ width: "200px" }}
              />
            </div>

            <h3>{event.title}</h3>
            <p>₹{event.price}</p>

            <div>
              <Link to={`/events/${event.id}`}>View Details</Link>
            </div>

           
            {user?.role === "admin" && (
              <div className="event-card" style={{ marginTop: "10px" }}>
                <button
                  onClick={() =>
                    navigate(`/admin/update-event/${event.id}`)
                  }
                  style={{
                    marginLeft: 10,
                    borderRadius: "3px",
                    border: "none",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "6px 10px"
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => deleteEvent(event.id)}
                  style={{
                    marginLeft: 10,
                    background: "red",
                    color: "white",
                    borderRadius: "3px",
                    border: "none",
                    padding: "6px 10px"
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Events;
