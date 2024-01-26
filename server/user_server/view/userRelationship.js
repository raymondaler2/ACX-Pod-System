const express = require("express");

const {
  getUserRelationship,
  deleteUserRelationship,
} = require("./../controller/userRelationship");

const router = express.Router();
router.get("/", getUserRelationship);
router.delete("/:id", deleteUserRelationship);

module.exports = router;
