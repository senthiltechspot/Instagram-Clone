const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }
  const token = authHeader;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).send("Token Not Valid");
    }
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

module.exports = { authenticate };
