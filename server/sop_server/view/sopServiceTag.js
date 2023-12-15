const express = require("express");

const {
  getSopServiceTag,
  deleteSopServiceTag,
} = require("./../controller/sopServiceTag");

const router = express.Router();
router.get("/", getSopServiceTag);
router.delete("/:id", deleteSopServiceTag);

module.exports = router;
