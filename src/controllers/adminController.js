const User = require("../models/userModel");

// Handle admin page
const getAdminPage = async (req, res) => {
  try {
    const users = await User.find({});
    res.render("admin", { users });
  } catch (err) {
    res.status(500).send("Error retrieving users");
  }
};

module.exports = { getAdminPage };
