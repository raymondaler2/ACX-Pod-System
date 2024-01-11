const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserRole = require("./userRole");
const UserPosition = require("./userPosition");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    birthday: {
      type: String,
    },
    email: {
      type: String,
    },
    contact_number: {
      type: Number,
    },
    emergency_contact: {
      type: String,
    },
    relationship: {
      type: String,
    },
    emergency_number: {
      type: Number,
    },
    username: {
      type: String,
      required: [true, "Please enter Username"],
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
    },
    position: {
      type: String,
      ref: UserPosition,
    },
    pod_designation: {
      type: String,
    },
    user_role: {
      type: String,
      ref: UserRole,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
