const ETag = require('etag')
const { maxAge, expires, cacheControl, lastModified, etag } = require('./config').cache

function cache (fstat, res) {
  if (expires) {
    res.setHeader('expires', (new Date(Date.now() + maxAge * 1000).toUTCString()))
  }
  if (cacheControl) {
    res.setHeader('cache-control', `public, max-age=${maxAge}`)
  }
  if (lastModified) {
    res.setHeader('last-modified', fstat.mtime.toUTCString())
  }
  if (etag) {
    res.setHeader('etag', ETag(fstat))
  }
}

exports.cache = cache

exports.hitCache = function (fstat, req, res) {
  cache(fstat, res)
  const reqLastModified = req.headers['if-modified-since']
  const reqEtag = req.headers['if-none-match']
  if (!reqLastModified && !etag) {
    return false
  }
  if (reqEtag !== res.getHeader('etag')) {
    return false
  }
  if (reqLastModified !== res.getHeader('last-modified')) {
    return false
  }
  return true
}
