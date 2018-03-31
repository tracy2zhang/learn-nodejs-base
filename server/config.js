module.exports = {
  port: 3000,
  host: '0.0.0.0',
  staticPath: '../',
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
