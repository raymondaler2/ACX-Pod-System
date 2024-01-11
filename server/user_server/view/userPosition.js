const express = require("express");

const {
  getUserPosition,
  deleteUserPosition,
} = require("./../controller/userPosition");

const router = express.Router();
router.get("/", getUserPosition);
router.delete("/:id", deleteUserPosition);

module.exports = router;
