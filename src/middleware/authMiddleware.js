const jwt = require("jsonwebtoken");

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.redirect("/identify");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect("/identify");
    req.user = user;
    next();
  });
};

// Authorization (User permissions)
const allowedTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("You are not allowed to access this route"));
    }

    next();
  };

module.exports = { authenticateToken, allowedTo };
