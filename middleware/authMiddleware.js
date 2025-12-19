const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 2. Check correct Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // 3. Extract token
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // 5. Move to next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
