const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.session.userRole)) {
      return res.status(403).json({ message: "Access Forbidden" });
    }
    next();
  };
};

module.exports = { authMiddleware, roleCheck };
