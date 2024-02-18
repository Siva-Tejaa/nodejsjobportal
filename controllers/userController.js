const { customSuccessResponse } = require("../config/globalResponse");
const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

module.exports.userController = (req, res) => {
  return res.send("Im From GEt User Controller");
};

module.exports.updateUserController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const user = await userModel.findOne({ _id: req.user.userId });

  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;

  //Encrypting the password
  const hashPassword = await bcrypt.hashSync(password, 10);

  user.password = hashPassword;

  await user.save();

  //Response
  customSuccessResponse.data = user;
  customSuccessResponse.message = "User Details Updated";
  customSuccessResponse.status = 201;
  customSuccessResponse.statusText = "New File Created";

  return res.send(customSuccessResponse);
};
