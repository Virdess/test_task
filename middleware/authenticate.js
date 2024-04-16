const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: true, message: 'Authentication token missing or invalid.', statusCode: 401, data: null });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ error: true, message: 'Authentication token is invalid.', statusCode: 401, data: null });
  }
};

module.exports = authenticate;
