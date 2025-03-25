exports.SuccessResponse = async (res, statusCode, message, data) => {
  res.status(statusCode).json({
    message: message,
    data: data,
  });
};

exports.ErrorResponse = async (res, statusCode, message, errors) => {
  res.status(statusCode).json({
    message: message,
    error: errors,
  });
};
