const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

const salt = bycrypt.genSaltSync(10);
const secret =  '$2b$10$r4gSCRHAGdYRILBjomH/N'


const generateAccessToken = (userObject) => {
  return jwt.sign(userObject, secret, { expiresIn: "24h" });
};

const verifyAccessToken = (token) => {
  return new Promise((res, rej) => {
    if (!token) {
      rej("Toekn Is Null");
    } else {
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          rej("Token Isn't Valid");
        } else {
          res(user);
        }
      });
    }
  });
};

module.exports = { generateAccessToken, verifyAccessToken };
