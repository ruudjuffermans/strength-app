function isPremium(req, res, next) {
    if (req.user?.role === 'Premium') {
      return next();
    }
    return res.status(403).json({ message: "Access denied." });
  }
  
  module.exports = { isPremium };