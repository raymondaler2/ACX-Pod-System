const mongoose = require("mongoose");

const userRoleSchema = mongoose.Schema({
  role: {
    type: String,
  },
});

const Role = mongoose.model("Role", userRoleSchema);
module.exports = Role;
