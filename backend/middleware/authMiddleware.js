// backend/middleware/authMiddleware.js
function authorizeRole(requiredRole) {
    return (req, res, next) => {
      const role = req.headers['role']; // You can also extract from token later
      if (role === requiredRole) {
        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    };
  }
  
  module.exports = { authorizeRole };
  