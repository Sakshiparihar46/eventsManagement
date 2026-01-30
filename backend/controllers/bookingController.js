const db = require("../config/db");

exports.createBooking = (req, res) => {
  const { event_id, name, email, mobile, quantity } = req.body;

  db.query(
    "SELECT price, available_seats FROM events WHERE id = ?",
    [event_id],
    (err, result) => {
      if (err || result.length === 0)
        return res.status(400).json({ message: "Event not found" });

      if (result[0].available_seats < quantity)
        return res.status(400).json({ message: "Seats not available" });

      const total_amount = result[0].price * quantity;

      db.query(
        `INSERT INTO bookings 
        (event_id, name, email, mobile, quantity, total_amount) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [event_id, name, email, mobile, quantity, total_amount],
        err => {
          if (err) return res.status(500).json(err);

          db.query(
            "UPDATE events SET available_seats = available_seats - ? WHERE id = ?",
            [quantity, event_id]
          );

          res.json({ message: "Booking confirmed" });
        }
      );
    }
  );
};

