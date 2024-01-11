const mongoose = require("mongoose");

const userPositionSchema = mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
});

const   Position = mongoose.model("Position", userPositionSchema);
module.exports = Position;
