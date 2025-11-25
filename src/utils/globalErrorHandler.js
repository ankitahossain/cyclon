require("dotenv").config()
// development Response
const development = (error, res) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    statusCode: error.statusCode,
    status: error.status,
    isOperationalError: error.isOperationalError,
    message: error.message,
    data: error.data,
    errorStack: error.stack
  })

}


// product response
const productResponse = (error, res) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  if (error.isOperationalError) {
    return res.status(statusCode).json({
      statusCode: error.statusCode,
      status: error.status,
      message: error.message,

    })
  }
  else {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({

      status: "OK!",
      message: " Something went wrong! Please try again later.",

    })

  }
  return res.status(statusCode).json({
    statusCode: error.statusCode,
    status: error.status,
    isOperationalError: error.isOperationalError,
    message: error.message,
    data: error.data,
    errorStack: error.stack
  })
}


exports.globalErrorHandler = (error, req, res, next) => {

  if (process.env.NODE_ENV == "development") {
    development(error, res)

  } else {
    productResponse(error, res)
  }


}