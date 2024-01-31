const mongoose = require("mongoose");

const userRelationshipSchema = mongoose.Schema({
  relationship: {
    type: String,
  },
});

const Relationship = mongoose.model("Relationship", userRelationshipSchema);
module.exports = Relationship;
