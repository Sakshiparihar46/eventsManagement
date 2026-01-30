import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/events";
import EventDetails from "./pages/eventsDetails";
import Booking from "./pages/booking";
import UpdateEvent from "./pages/edit";
import Boilerplate from "./pages/boilerplate.jsx";
import AdminAddEvent from "./pages/addEvent.jsx";
import "./pages/boilerplate.css";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Boilerplate>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/admin/add-event" element={<AdminAddEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/bookings/:id" element={<Booking />} />
          <Route path="/admin/update-event/:id" element={<UpdateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Boilerplate>
    </BrowserRouter>
  );
}

export default App;

