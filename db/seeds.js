const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Supplier = require('../models/Supplier')
const Product = require('../models/Product')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return Supplier.create([
          { name: 'New Co Ltd' },
          { name: 'Old Co Ltd' }
        ])
      })
      .then(suppliers => {
        console.log(`${suppliers.length} suppliers seeded.`)
        return Product.create([
          {
            name: 'Small wongle',
            supplier: suppliers[0],
            price: 5
          },
          {
            name: 'Large wongle',
            supplier: suppliers[0],
            price: 8
          },
          {
            name: 'Super wongle',
            supplier: suppliers[0],
            price: 12
          },
          {
            name: 'Mini wongle',
            supplier: suppliers[1],
            price: 4
          },
          {
            name: 'Small wongle',
            supplier: suppliers[1],
            price: 6
          },
          {
            name: 'Large wongle',
            supplier: suppliers[1],
            price: 9
          },
          {
            name: 'Super wongle',
            supplier: suppliers[1],
            price: 13
          }
        ])
      })
      .then(products => console.log(`${products.length} products seeded.`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)