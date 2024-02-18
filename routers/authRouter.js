const {
  registerController,
  loginController,
} = require("../controllers/authController");
const { registerMiddleware } = require("../middlewares/registerMiddleware");
const { loginMiddleware } = require("../middlewares/loginMiddleware");

const router = require("express").Router();

router.post("/register", registerMiddleware, registerController);

//LOGIN || POST
router.post("/login", loginMiddleware, loginController);

module.exports = router;
