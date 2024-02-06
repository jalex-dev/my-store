function logErrors (error, req, res, next) {
  console.log('log errors');
  console.log(error);
  next(error);
}

function errorsHandler (error, req, res, next) {
  console.log('error handler');
  res.status(500).json({
    message: error.message,
    stack:  error.stack
  }
  );
}
function boomErrorsHandler (error, req, res, next) {
  if (error.isBoom) {
   const { output } = error;
   res.status(output.statusCode).json(output.payload);
  }else{
  next(error);
  }

}

module.exports= {logErrors, errorsHandler,boomErrorsHandler};
