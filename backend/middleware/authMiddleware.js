const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ msg: "Access denied, admins only" });
    }
  });
};

module.exports = { authMiddleware, verifyAdmin };
