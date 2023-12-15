const express = require("express");

const { addSop, getAllSop, deleteSop } = require("./../controller/sop");

const router = express.Router();
router.post("/", addSop);
router.get("/", getAllSop);
router.delete("/:id", deleteSop);

module.exports = router;
