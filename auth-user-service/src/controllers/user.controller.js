const User = require("../models/user.model");

// GET PROFILE
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name;
  user.bio = req.body.bio || user.bio;

  const updatedUser = await user.save();

  res.json(updatedUser);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "User deleted" });
};