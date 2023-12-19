const express = require("express");

const {
  addUser,
  deleteUser,
  loginUser,
  getAllUser,
  getUserById,
} = require("./../controller/user");

const router = express.Router();
router.get("/:id", getUserById);
router.get("/", getAllUser);
router.post("/login", loginUser);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
