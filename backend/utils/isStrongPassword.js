const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-+=.,:;])[A-Za-z\d@$!%*?&#_\-+=.,:;]{8,}$/;

function isStrongPassword(password) {
  return strongPasswordRegex.test(password);
}

module.exports = isStrongPassword;
