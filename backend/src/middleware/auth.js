const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};

const uploadMiddleware = require("multer")({
  storage: require("multer").memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = { ensureAuthenticated, uploadMiddleware };
