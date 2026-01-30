import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/events";
import EventDetails from "./pages/eventsDetails";
import Booking from "./pages/booking";
import UpdateEvent from "./pages/edit";
import Boilerplate from "./pages/boilerplate";
import AdminAddEvent from "./pages/addEvent";
import "./pages/boilerplate.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

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

