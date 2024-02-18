module.exports.registerMiddleware = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname) {
    return res.send("Please Enter First Name");
  }
  if (!lastname) {
    return res.send("Please Enter Last Name");
  }
  if (!email) {
    return res.send("Please Enter Email");
  }
  if (!password) {
    return res.send("Please Enter Password");
  }

  // If all fields are present, proceed to the next middleware or controller
  next();
};
