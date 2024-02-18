const { customSuccessResponse } = require("../config/globalResponse");

module.exports.homeController = (req, res) => {
  //Response
  //   customSuccessResponse.data = user;
  customSuccessResponse.message = "User Home Page";
  customSuccessResponse.status = 200;
  customSuccessResponse.statusText = "OK";

  return res.send(customSuccessResponse);
};
