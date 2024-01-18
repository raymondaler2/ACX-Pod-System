const mongoose = require("mongoose");

const userPositionSchema = mongoose.Schema({
  position: {
    type: String,
  },
});

const Position = mongoose.model("Position", userPositionSchema);
module.exports = Position;
