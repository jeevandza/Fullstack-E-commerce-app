const bcryptJs = require("bcryptjs");

async function hashPassword(password) {
  const salt = bcryptJs.genSaltSync(10);
  return bcryptJs.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return bcryptJs.compare(password, hash);
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader && bearerHeader?.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send({ msg: "Invalid token" });
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
