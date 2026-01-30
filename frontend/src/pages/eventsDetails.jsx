import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "./events.css";


function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div >
     <div className="card"><img src={event.img} alt="" />
      </div> 
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>
      <p>Available Seats: {event.available_seats}</p>
      <p>Price: ₹{event.price}</p>
       <div className="event-card">
      <Link to={`/bookings/${event.id}`}>Book Now</Link>
       </div>

    </div>
  );
}

export default EventDetails;
