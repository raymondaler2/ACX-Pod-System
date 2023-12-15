const mongoose = require("mongoose");

const userRoleSchema = mongoose.Schema({
  role: {
    type: String,
    unique: true,
  },
});

const UserRole = mongoose.model("UserRole", userRoleSchema);
module.exports = UserRole;
