const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");


module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("No token provided");

  const token = authHeader.split(" ").at(1);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    request.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to acess this route");
  }
};