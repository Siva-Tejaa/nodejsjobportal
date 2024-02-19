const JWT = require("jsonwebtoken");
const { customErrorResponse } = require("../config/globalResponse");

module.exports.userAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    //Custom Response

    customErrorResponse.message =
      "Access Denied, You are not authorized to access this page.";
    customErrorResponse.status = 401;
    customErrorResponse.statusText = "Unauthorized";

    return res.send(customErrorResponse);
  }

  const userJwtToken = authHeader.split(" ")[1];

  try {
    const payload = JWT.verify(userJwtToken, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    //customErrorResponse
    customErrorResponse.error = error;
    customErrorResponse.message = "User Authentication Failed";
    customErrorResponse.status = 401;
    customErrorResponse.statusText = "Unauthorized";

    return res.status(500).send(customErrorResponse);
    // return res.send(`Authentication Failed ${error}`);
  }
};
