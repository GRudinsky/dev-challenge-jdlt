const Supplier = require('../models/Supplier')
const { response200, response404 } = require('./helper')

function indexRoute(req, res) {
  Supplier
    .find()
    .populate({ path: 'products', select: 'name supplier' })
    .then(suppliers => response200(res, suppliers))
    .catch(() => response404(res))
}

function showRoute(req, res) {
  Supplier
    .findById(req.params.id)
    .populate('products')
    .then(supplier => {
      if (!supplier) return response404(res)
      response200(res, supplier)
    })
    .catch(() => response404(res))
}

module.exports = {
  index: indexRoute,
  show: showRoute
}