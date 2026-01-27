const { customError } = require('../utils/customError');

const multerErrorMiddleware = (err, req, res, next) => {
  if (err) {
    return next(new customError(400, err.message));
  }
  next();
};

module.exports = multerErrorMiddleware;
