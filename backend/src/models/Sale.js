const mongoose = require("mongoose");

// Use strict:false so MongoDB fields from CSV (with spaces & caps) are allowed
const saleSchema = new mongoose.Schema({}, { strict: false });

// THIRD argument "sales" ensures it maps exactly to your sales collection
module.exports = mongoose.model("Sale", saleSchema, "sales");
