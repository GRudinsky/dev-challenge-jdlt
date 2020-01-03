function response404(a) {
  a.status(404).json({ message: 'Not Found' })
}
function response200(a, b) {
  a.status(200).json(b)
}

module.exports = {
  response200,
  response404
}