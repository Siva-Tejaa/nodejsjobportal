const { customErrorResponse } = require("../config/globalResponse");

module.exports.createJobMiddleware = (req, res, next) => {
  const { company, position } = req.body;

  req.body.createdBy = req.user.userId;

  if (!company) {
    //customErrorResponse
    (customErrorResponse.message = "Please Provide Company Name"),
      (customErrorResponse.status = 400);
    customErrorResponse.statusText = "Bad Request";
    return res.status(400).send(customErrorResponse);
  }

  if (!position) {
    //customErrorResponse
    (customErrorResponse.message = "Please Provide Position"),
      (customErrorResponse.status = 400);
    customErrorResponse.statusText = "Bad Request";
    return res.status(400).send(customErrorResponse);
  }

  next();
};
