function requireAuth(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Please login first" });
    }
    next();
  }

module.exports=requireAuth;