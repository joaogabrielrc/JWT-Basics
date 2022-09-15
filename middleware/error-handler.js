const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");


const errorHandlerMiddleware = (error, request, response, next) => {
  if (error instanceof CustomAPIError) {
    return response
      .status(error.statusCode)
      .json({ msg: error.message });
  }
  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong");
};

module.exports = errorHandlerMiddleware;
