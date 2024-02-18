const JWT = require("jsonwebtoken");

module.exports.userAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.send("Please provide Bearer Auth Token");
  }

  const userJwtToken = authHeader.split(" ")[1];

  try {
    const payload = JWT.verify(userJwtToken, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.send(`Authentication Failed ${error}`);
  }
};
