function isAdmin(req, res, next) {
    if (req.user?.role === 'Admin') {
      return next();
    }
    return res.status(403).json({ message: "Access denied." });
  }
  
  module.exports = { isAdmin };