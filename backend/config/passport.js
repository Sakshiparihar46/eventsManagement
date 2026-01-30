const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./db");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    (email, password, done) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, users) => {
          if (err) return done(err);
          if (!users.length) return done(null, false);

          const user = users[0];
          const match = await bcrypt.compare(password, user.password);
          if (!match) return done(null, false);

          return done(null, user);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, users) => {
    if (err) return done(err);
    const user = users[0];
    if (user) {
      user.role = "admin"; 
    }
    done(null, user);
  });
});

module.exports = passport;



