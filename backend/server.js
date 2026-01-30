const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const passport = require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true
  })
);

app.use(
  session({
    name: "sid",
    secret: "secret123",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000 
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/authRoutes"));
app.use("/events", require("./routes/eventRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
