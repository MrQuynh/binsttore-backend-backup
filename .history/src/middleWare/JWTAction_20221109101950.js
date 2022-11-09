import jwt from "jsonwebtoken";

const createJWT = (data) => {
  let token = null;
  try {
    token = jwt.sign(data, "nguyenvanquynh123");
  } catch (e) {
    console.log(e);
  }

  return token;
};

const verifyToken = (token) => {
  let data = null;
  try {
    const decoded = jwt.verify(token, "nguyenvanquynh123");
    data = decoded;
  } catch (e) {
    console.log(e);
  }
  return data;
};
const authorToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  const data = verifyToken(token);
  if (!data) return res.sendStatus(403);
  req.userId = data;
  next();
};
module.exports = { createJWT, verifyToken, authorToken };
