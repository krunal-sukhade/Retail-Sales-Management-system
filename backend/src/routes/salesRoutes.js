const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

// GET /api/sales?search=&page=&region=&gender=&...
router.get("/", salesController.getSales);

module.exports = router;
