const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: String, required: true },
  PurchaseDate: { type: Date, required: true }
})

module.exports = mongoose.model('Transaction', transactionSchema)
