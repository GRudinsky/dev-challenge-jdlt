const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/jdlt-db-${env}`
const port = process.env.PORT || 4000


module.exports = {
  dbURI,
  port
}