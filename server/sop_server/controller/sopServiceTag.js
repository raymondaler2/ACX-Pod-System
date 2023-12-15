const sopServiceTag = require("./../model/sopServiceTag");
const asyncHandler = require("express-async-handler");

const getSopServiceTag = asyncHandler(async (req, res) => {
  try {
    const serviceTags = await sopServiceTag.find();
    res.status(200).json(serviceTags);
  } catch (error) {
    res.status(500).json(`Get All Sop Service Tag ERROR: ${error}`);
    console.error(`Get All Sop Service Tag ERROR: ${error}`);
  }
});

const deleteSopServiceTag = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const serviceTag = await sopServiceTag.findByIdAndDelete(id, req);
    if (!serviceTag) {
      res
        .status(404)
        .json("Delete SOP Service Tag ERORR: Service Tag not found");
      console.error("Delete SOP Service Tag ERORR: Service Tag not found");
    }
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json(`Delete SOP Service Tag ERORR: ${error}`);
    console.error(`Delete SOP Service Tag ERORR: ${error}`);
  }
});

module.exports = { getSopServiceTag, deleteSopServiceTag };
