/* global describe, beforeEach, afterEach, it, api, expect */
const Supplier = require('../../models/Supplier')

describe('GET /suppliers', () => {
  beforeEach(done => {
    Supplier.create([
      { name: 'New Co Ltd' },
      { name: 'Old Co Ltd' }
    ])
      .then(() => done())
  })

  afterEach(done => {
    Supplier.deleteMany()
      .then(() => done())
  })

  it('response status should be 200', done => {
    api.get('/api/suppliers')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('response should be an array', done => {
    api.get('/api/suppliers')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('response should be an array of objects', done => {
    api.get('/api/suppliers')
      .end((err, res) => {
        res.body.forEach(supplier => {
          expect(supplier).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/suppliers')
      .end((err, res) => {
        res.body.forEach(supplier => {
          expect(supplier).to.contain.keys([
            '_id',
            'name'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/products')
      .end((err, res) => {
        res.body.forEach(supplier => {
          expect(supplier._id).to.be.a('string')
          expect(supplier.name).to.be.a('string')
        })
        done()
      })
  })
})





     