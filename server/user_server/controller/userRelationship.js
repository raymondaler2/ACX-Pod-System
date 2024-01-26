const userRelationship = require("./../model/userRelationship");
const asyncHandler = require("express-async-handler");

const getUserRelationship = asyncHandler(async (req, res) => {
  try {
    const Relationships = await userRelationship.find();
    res.status(200).json(Relationships);
  } catch (error) {
    res.status(500).json(`Get All User Relationships ERROR: ${error}`);
    console.error(`Get All User Relationships ERROR: ${error}`);
  }
});

const deleteUserRelationship = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const relationship = await userRelationship.findByIdAndDelete(id, req);
    if (!relationship) {
      res
        .status(404)
        .json("Delete User Relationship ERORR: Relationship not found");
      console.error("Delete User Relationship ERORR: Relationship not found");
    }
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json(`Delete User Relationship ERORR: ${error}`);
    console.error(`Delete User Relationship ERORR: ${error}`);
  }
});

module.exports = { getUserRelationship, deleteUserRelationship };
