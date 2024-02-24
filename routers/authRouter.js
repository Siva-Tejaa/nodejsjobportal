const {
  registerController,
  loginController,
} = require("../controllers/authController");
const { registerMiddleware } = require("../middlewares/registerMiddleware");
const { loginMiddleware } = require("../middlewares/loginMiddleware");

const router = require("express").Router();

/**
 *
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type:Object
 *      required:
 *        - firstname
 *        - lastname
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type:string
 *          description: The Auto Generated ID of user collection
 *          example:ASWEDRFTGYUHIKKJU8OL
 *        firstname:
 *          type:string
 *          description: First Name
 *        lastname:
 *          type:string
 *          description: Last Name
 *        email:
 *          type:string
 *          description: Email
 *        password:
 *          type:string
 *          description: Password
 *      example:
 *        id:ASWEDRFTGYUHIKKJU8OL
 *        firstname:Siva
 *        lastname:Teja
 *        email:asivateja1999@gmail.com
 *        password:SivaTeja@1999
 *
 */

/**
 *
 * @swagger
 * tags:
 *  name:auth
 *  description:Authentication API's
 */

/**
 *
 * @swagger
 * /register
 *  post:
 *    summary:Register New User
 *    tags:[Auth]
 *    requestBody:
 *    content:
 *      application/json:
 *        schema:
 *          $ref:'#components/schemas/User'
 *    responses:
 *      201:
 *        description:User Created Successfully
 *  *     content:
 *          application/json:
 *            schema:
 *              $ref:'#components/schemas/User'
 *
 *
 */

//REGISTER || POST
router.post("/register", registerMiddleware, registerController);

//LOGIN || POST
router.post("/login", loginMiddleware, loginController);

module.exports = router;
