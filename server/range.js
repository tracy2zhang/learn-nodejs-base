module.exports = {
  range (total, req, res) {
    const range = req.headers['range']
    if (range) {
      const sizes = range.match(/bytes=(\d*)-(\d*)/)
      const start = +sizes[1] || 0
      const end = +sizes[2] || (total - 1)
      if (start < 0 || start > end || end >= total) {
        return {
          statusCode: 416
        }
      }
      res.setHeader('Accept-Ranges', 'bytes')
      res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`)
      res.setHeader('Content-Length', end - start + 1)
      return {
        statusCode: 206,
        start,
        end
      }
    } else {
      return {
        statusCode: 200
      }
    }
  }
}
