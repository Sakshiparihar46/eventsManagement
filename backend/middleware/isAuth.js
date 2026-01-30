exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Login required" });
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() ) {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};
