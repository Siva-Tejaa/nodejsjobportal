const {
  userController,
  updateUserController,
} = require("../controllers/userController");
const { userAuthentication } = require("../middlewares/userAuthMiddleware");
const { registerMiddleware } = require("../middlewares/registerMiddleware");

const router = require("express").Router();

//GET Users || GET
router.get("/users", userController); //NOT IMPLEMENTED

//Update Users || PUT
router.put(
  "/update-user",
  userAuthentication,
  registerMiddleware,
  updateUserController
);

module.exports = router;
