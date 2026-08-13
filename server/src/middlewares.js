function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  //pancakes from codinggarden :)
  res.json({
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    errors: error.errors || undefined,
  });
}

module.exports = {
  errorHandler,
};
