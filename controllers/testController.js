module.exports.exampleController = (req, res) => {
  return res.send(`Iam from Test Router ${req.user.userId}`);
};
