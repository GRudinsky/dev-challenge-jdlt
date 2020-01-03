/* global describe, beforeEach, afterEach, it, api, expect */
const Product = require('../../models/Product')
const Supplier = require('../../models/Supplier')

describe('GET /products', () => {
  beforeEach(done => {
    Supplier.create([
      { name: 'New Co Ltd' },
      { name: 'Old Co Ltd' }
    ])
      .then(suppliers => {
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
      .then(() => done())
  })

  afterEach(done => {
    Supplier.deleteMany()
      .then(() => Product.deleteMany())
      .then(() => done())
  })

  it('response status should be 200', done => {
    api.get('/api/products')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('response should be an array', done => {
    api.get('/api/products')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('response should be an array of objects', done => {
    api.get('/api/products')
      .end((err, res) => {
        res.body.forEach(product => {
          expect(product).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/products')
      .end((err, res) => {
        res.body.forEach(product => {
          expect(product).to.contain.keys([
            '_id',
            'name',
            'supplier',
            'price'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/products')
      .end((err, res) => {
        res.body.forEach(product => {
          expect(product._id).to.be.a('string')
          expect(product.name).to.be.a('string')
          expect(product.supplier).to.be.a('object')
          expect(product.price).to.be.a('number')
        })
        done()
      })
  })
})





     