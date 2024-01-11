const mongoose = require("mongoose");

const userRoleSchema = mongoose.Schema({
  role: {
    type: String,
    unique: true,
  },
});

const Role = mongoose.model("Role", userRoleSchema);
module.exports = Role;
