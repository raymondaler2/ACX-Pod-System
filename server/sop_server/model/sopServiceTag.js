const mongoose = require("mongoose");

const sopServiceTagSchema = mongoose.Schema({
  service_tag: {
    type: String,
    required: true,
  },
});

const ServiceTag = mongoose.model("ServiceTag", sopServiceTagSchema);
module.exports = ServiceTag;
