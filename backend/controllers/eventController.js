const db = require("../config/db");

exports.createEvent = (req, res) => {
  const { title, description, location, date, total_seats, price } = req.body;
  const img = req.file ? req.file.path : null;

  const sql = `
    INSERT INTO events
    (title, description, location, date, total_seats, available_seats, price, img)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, location, date, total_seats, total_seats, price, img],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Event created successfully", eventId: result.insertId });
    }
  );
};


//view events by date
exports.getAllEvents = (req, res) => {
  const sql = "SELECT * FROM events ORDER BY date ASC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


//view events
exports.getEventById = (req, res) => {
  const sql = "SELECT * FROM events WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

//update events
exports.updateEvent = (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    location,
    date,
    total_seats,
    available_seats,
    price
  } = req.body;

  const newImg = req.file ? req.file.path : null;

  db.query(
    "SELECT img FROM events WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Event not found" });

      const oldImg = result[0].img;

      const finalImg = newImg || oldImg;

      const final_available_seats =
        available_seats !== undefined
          ? available_seats
          : total_seats;

      
      const sql = `
        UPDATE events SET
        title=?, description=?, location=?, date=?,
        total_seats=?, available_seats=?, price=?, img=?
        WHERE id=?
      `;

      db.query(
        sql,
        [
          title,
          description,
          location,
          date,
          total_seats,
          final_available_seats,
          price,
          finalImg,
          id
        ],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "Event updated successfully" });
        }
      );
    }
  );
};

exports.deleteEvent = (req, res) => {
  db.query("SELECT * FROM events WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Event not found" });

    const event = result[0];
    const isAdmin = req.user.role === "admin";

    if (!isAdmin && req.user.id !== event.user_id) {
      return res.status(403).json({ message: "You are not allowed to delete this event" });
    }

    db.query("DELETE FROM events WHERE id = ?", [req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Event deleted successfully" });
    });
  });
};






