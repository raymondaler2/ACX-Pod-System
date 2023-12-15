const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserRole = require("./userRole");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    address: {
      type: String,
    },
    contact: {
      type: Number,
    },
    email: {
      type: String,
    },
    emergency_contact: {
      type: Number,
    },
    cv: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
    },
    work_email: {
      type: String,
      required: [true, "Please enter Work Email"],
    },
    position: {
      type: String,
    },
    user_role: {
      type: String,
      ref: UserRole,
    },
    pod_id: {
      type: String,
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
