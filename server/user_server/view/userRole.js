const express = require("express");

const { getUserRole, deleteUserRole } = require("./../controller/userRole");

const router = express.Router();
router.get("/", getUserRole);
router.delete("/:id", deleteUserRole);

module.exports = router;
