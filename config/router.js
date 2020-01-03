const router = require('express').Router()
const suppliers = require('../controllers/suppliers')
const products = require('../controllers/products')

router.route('/suppliers')
  .get(suppliers.index)

router.route('/suppliers/:id')
  .get(suppliers.show)

router.route('/products')
  .get(products.index)

router.route('/products/:id')
  .get(products.show)

module.exports = router