const bcrypt = require("bcrypt");
const saltRounds = 10;

function hashedPassword(plainpassword) {
  return bcrypt.hash(plainpassword, saltRounds);
}

function checkHashPassword(plainpassword, hash) {
  return bcrypt.compare(plainpassword, hash);
}

module.exports = {
  hashedPassword,
  checkHashPassword,
};
