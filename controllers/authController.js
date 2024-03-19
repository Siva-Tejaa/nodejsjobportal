// module.exports.
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userModel = require("../models/userModel");

const {
  customSuccessResponse,
  customErrorResponse,
} = require("../config/globalResponse");

module.exports.registerController = async (req, res) => {
  try {
    // console.log("Aut")
    const { firstname, lastname, email, password } = req.body;

    //Hashing the Password
    const hashPassword = await bcrypt.hashSync(password, 10);

    //Writing To Database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // customErrorResponse.error = error;
      customErrorResponse.message = "Email Already Registered";
      customErrorResponse.status = 409;
      customErrorResponse.statusText = "Bad Request";

      return res.status(409).send(customErrorResponse);
      return res.send("Email Already Registered");
    }

    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    customSuccessResponse.data = user;
    customSuccessResponse.message = "New User Created";
    customSuccessResponse.status = 201;
    customSuccessResponse.statusText = "Created";

    res.status(201).send(customSuccessResponse);
  } catch (error) {
    customErrorResponse.error = error;
    customErrorResponse.message = "Something Went Wrong";
    customErrorResponse.status = 500;
    customErrorResponse.statusText = "Internal Server Error";

    res.status(500).send(customErrorResponse);
  }
};

module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find User by mail in DB
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send("User Email ID Not Found");
    }

    // Compare UserPassword & Encrypted Password from DB
    const passwordComparision = await bcrypt.compare(password, user.password);

    if (!passwordComparision) {
      return res.send("Password is not Matching");
    }

    //JSON WEB TOKEN CREATION
    const jwtToken = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.password = undefined;

    res.send({
      success: "true",
      message: "User Logged In Successfully",
      user,
      jwtToken,
    });
  } catch (error) {
    res.status(500).send(`Something Went Wrong ${error.message}`);
  }
};
