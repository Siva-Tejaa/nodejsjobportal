const router = require("express").Router();

const { exampleController } = require("../controllers/testController");

const { userAuthentication } = require("../middlewares/userAuthMiddleware");

router.get("/test", userAuthentication, exampleController);

module.exports = router;
