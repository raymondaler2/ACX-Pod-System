const express = require("express");

const {
  addSop,
  getAllSop,
  deleteSop,
  getAllSopIDs,
  getSopById,
  updateSop,
} = require("./../controller/sop");

const router = express.Router();
router.put("/:id", updateSop);
router.get("/:id", getSopById);
router.get("/all/id/", getAllSopIDs);
router.post("/", addSop);
router.get("/", getAllSop);
router.delete("/:id", deleteSop);

module.exports = router;
