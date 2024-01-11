const userRole = require("./../model/userRole");
const asyncHandler = require("express-async-handler");

const getUserRole = asyncHandler(async (req, res) => {
  try {
    const Roles = await userRole.find();
    res.status(200).json(Roles);
  } catch (error) {
    res.status(500).json(`Get All Use Roles ERROR: ${error}`);
    console.error(`Get All Use Roles ERROR: ${error}`);
  }
});

const deleteUserRole = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const role = await userRole.findByIdAndDelete(id, req);
    if (!role) {
      res.status(404).json("Delete User Role ERORR: Role not found");
      console.error("Delete User Role ERORR: Role not found");
    }
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json(`Delete User Role ERORR: ${error}`);
    console.error(`Delete User Role ERORR: ${error}`);
  }
});

module.exports = { getUserRole, deleteUserRole };
