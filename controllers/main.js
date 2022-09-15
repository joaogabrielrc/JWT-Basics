const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");


const login = async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password)
    throw new BadRequestError("Please provide email and password");

  // just for demo, normally provided by database
  const id = new Date().getDate();

  const token = jwt.sign(
    { id, username },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  response.status(200).json({
    msg: "User created",
    token
  });
};

const dashboard = async (request, response) => {
  const { username } = request.user;
  const luckyNumber = Math.floor(Math.random() * 100);

  response.status(200).json({
    msg: `Hello, ${username}`,
    secret: `Your lucky number is ${luckyNumber}`
  });
};

module.exports = {
  login,
  dashboard
};