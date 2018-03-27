const zlib = require('zlib')

module.exports = {
  compress (rs, req, res) {
    const acceptEncoding = req.headers['accept-encoding']
    if (!acceptEncoding || !/gzip|deflate/.test(acceptEncoding)) {
      return rs
    } else if (/gzip/.test(acceptEncoding)) {
      res.setHeader('Content-Encoding', 'gzip')
      return rs.pipe(zlib.createGzip())
    } else if (/deflate/.test(acceptEncoding)) {
      res.setHeader('Content-Encoding', 'deflate')
      return rs.pipe(zlib.createDeflate())
    }
  }
}
