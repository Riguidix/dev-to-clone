const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token !== undefined) {
    const bearer = token.split(" ");
    const realToken = bearer[1];

    if (jwt.verify(realToken, process.env.SECRET_TOKEN)) {
      req.token = realToken;
      next();

      return;
    }

    res.status(403).json({
      success: true,
      message: "Invalid token",
    });
  } else {
    res.status(401).json({
      success: true,
      message: "Oops! you're not log in.",
    });
    return;
  }
};
