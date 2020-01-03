const mongoose = require('mongoose')
const productSchema = require('../models/Product')

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

module.exports = mongoose.model('Supplier', supplierSchema)