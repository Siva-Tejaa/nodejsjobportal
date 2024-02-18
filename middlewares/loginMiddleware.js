module.exports.loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.send("Email is Required");
  }
  if (!password) {
    return res.send("Password is Required");
  }

  // If all fields are present, proceed to the next middleware or controller
  next();
};
