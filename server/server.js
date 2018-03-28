const os = require('os')
const fs = require('fs')
const http = require('http')
const path = require('path')
const promisify = require('util').promisify
const chalk = require('chalk')
const mime = require('mime')
const pug = require('pug')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const { port, host, staticPath } = require('./config')
const { compress } = require('./compress')
const { range } = require('./range')

function getIpAddress (network) {
  for (let key of Object.keys(network)) {
    let iface = network[key]
    for (let info of iface) {
      if (info.family.toLowerCase() === 'ipv4' && info.address !== '127.0.0.1' && !info.internal) {
        return info.address
      }
    }
  }
}

const network = os.networkInterfaces()
const hostname = getIpAddress(network)
const dirTemplate = pug.compileFile(path.join(__dirname, 'pug/dir.pug'))
const notFoundTemplate = pug.compileFile(path.join(__dirname, 'pug/404.pug'))

const server = http.createServer(async (req, res) => {
  try {
    const url = req.url
    const isRoot = url === '/'
    const filePath = path.join(__dirname, staticPath, url)
    const fstat = await stat(filePath)
    res.statusCode = 200
    if (fstat.isFile()) {
      const mimeType = mime.getType(filePath)
      const total = fstat.size
      const { statusCode, start, end } = range(total, req, res)
      res.statusCode = statusCode
      if (statusCode === 416) {
        res.end('Requested Range Not Satisfiable')
        return
      }
      let rs
      if (statusCode === 206) {
        rs = fs.createReadStream(filePath, { start, end })
      } else {
        rs = fs.createReadStream(filePath)
      }
      if (mimeType.startsWith('text') || mimeType.startsWith('application')) {
        rs = compress(rs, req, res)
      }
      res.setHeader('content-type', `${mimeType};charset=UTF-8`)
      rs.pipe(res)
    } else if (fstat.isDirectory()) {
      res.setHeader('content-type', 'text/html;charset=UTF-8')
      const files = await readdir(filePath)
      res.end(dirTemplate({
        title: isRoot ? 'index' : path.basename(url),
        files: files.map(file => path.join(url, file)).sort((f1, f2) => f1.indexOf('.') - f2.indexOf('.')),
        isRoot,
        path
      }))
    }
  } catch (err) {
    console.error(chalk.red(err))
    res.statusCode = 404
    res.setHeader('content-type', 'text/html;charset=UTF-8')
    // fs.createReadStream(path.join(__dirname, '404.html')).pipe(res)
    res.end(notFoundTemplate({ errMsg: err.toString() }))
  }
})

server.listen(port, host, () => {
  console.info(chalk.green(`Server is running at http://${hostname}:${port}`))
})
