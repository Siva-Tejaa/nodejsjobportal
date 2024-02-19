const router = require("express").Router();

const { customErrorResponse } = require("../config/globalResponse");

router.get("/", (req, res) => {
  //Custom Response
  customErrorResponse.message =
    "The resource requested could not be found on this server!";
  (customErrorResponse.status = 404),
    (customErrorResponse.statusText = "Not Found");

  return res.status(404).send(customErrorResponse);
});

module.exports = router;
