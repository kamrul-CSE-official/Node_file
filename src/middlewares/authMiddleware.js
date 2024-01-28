//middewares/authMiddeware.js
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = {
  authenticateJWT,
};
