const Product = require('../models/Product')
const { response200, response404 } = require('./helper')

function index(req, res) {
  Product
    .find()
    .populate('supplier')
    .then(products => response200(res, products))
    .catch(() => response404(res))
}

function show(req, res) {
  Product
    .findById(req.params.id)
    .populate('supplier')
    .then(product => {
      if (!product) return response404(res)
      response200(res, product)
    })
    .catch(() => response404(res))
}

module.exports = {
  index,
  show
}

