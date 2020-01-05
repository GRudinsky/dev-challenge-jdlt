const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

supplierSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'supplier',
  justOne: false
})

supplierSchema.set('toJSON', { 
  virtuals: true 
})

module.exports = mongoose.model('Supplier', supplierSchema)