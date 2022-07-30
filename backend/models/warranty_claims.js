const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  MetamaskId: { type: String, required: true },
});

module.exports = mongoose.model("Warranty", userSchema);
