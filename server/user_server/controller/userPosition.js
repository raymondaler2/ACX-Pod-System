const userPosition = require("./../model/userPosition");
const asyncHandler = require("express-async-handler");

const getUserPosition = asyncHandler(async (req, res) => {
  try {
    const Positions = await userPosition.find();
    res.status(200).json(Positions);
  } catch (error) {
    res.status(500).json(`Get All User Positions ERROR: ${error}`);
    console.error(`Get All Use Positions ERROR: ${error}`);
  }
});

const deleteUserPosition = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const position = await userPosition.findByIdAndDelete(id, req);
    if (!position) {
      res.status(404).json("Delete User Position ERORR: Position not found");
      console.error("Delete User Position ERORR: Position not found");
    }
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json(`Delete User Position ERORR: ${error}`);
    console.error(`Delete User Position ERORR: ${error}`);
  }
});

module.exports = { getUserPosition, deleteUserPosition };
