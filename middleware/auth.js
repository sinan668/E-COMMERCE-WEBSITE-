const jwt = require ('jsonwebtoken')

require('dotenv').config();




exports.auth = (req, res, next) => {
  try {
    const authHead = req.headers['authorization'];

    // Check if header exists
    if (!authHead) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // ✅ Extract the token (Bearer <token>)
    const token = authHead.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded data (like userId) to request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};
