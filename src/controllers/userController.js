const User = require("../models/userModel");

// Handle user profile
const getUserProfile = async (req, res) => {
  if (req.params.userId !== req.user.userID) {
    return res.status(403).send("Forbidden");
  }

  try {
    const user = await User.findOne({ userID: req.params.userId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("userProfile", { user });
  } catch (err) {
    res.status(500).send("Error retrieving user profile");
  }
};

module.exports = { getUserProfile };
