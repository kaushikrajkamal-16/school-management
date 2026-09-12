const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SEC);
  return token;
};

module.exports = generateAccessToken;
