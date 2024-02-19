const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserRole = require("./userRole");
const UserPosition = require("./userPosition");
const UserRelationship = require("./userRelationship");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: {},
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    emergency_contact: {
      type: String,
    },
    emergency_number: {
      type: String,
    },
    relationship: {
      type: String,
      ref: UserRelationship,
    },
    username: {
      type: String,
      required: [true, "Please enter Username"],
    },
    position: {
      type: String,
      ref: UserPosition,
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
    },
    role: {
      type: String,
      ref: UserRole,
    },
    employee_number: {
      type: String,
    },
    philhealth: {
      type: String,
    },
    pagibig: {
      type: String,
    },
    tin_number: {
      type: String,
    },
    nbi_clerance_url: {
      type: String,
    },
    resume_cv_url: {
      type: String,
    },
    portfolio_url: {
      type: String,
    },
    nbi_clerance_id: {
      type: String,
    },
    resume_cv_id: {
      type: String,
    },
    portfolio_id: {
      type: String,
    },
    pod_designation: {
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
