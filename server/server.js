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
      res.setHeader('content-type', mime.getType(filePath))
      fs.createReadStream(filePath).pipe(res)
    } else if (fstat.isDirectory()) {
      res.setHeader('content-type', 'text/html')
      const files = await readdir(filePath)
      res.end(dirTemplate({
        title: isRoot ? 'index' : path.basename(url),
        files: files.map(file => path.join(url, file)),
        isRoot,
        path
      }))
    }
  } catch (err) {
    console.error(chalk.red(err))
    res.statusCode = 404
    res.setHeader('content-type', 'text/html')
    // fs.createReadStream(path.join(__dirname, '404.html')).pipe(res)
    res.end(notFoundTemplate({ errMsg: err.toString() }))
  }
})

server.listen(port, host, () => {
  console.info(chalk.green(`Server is running at http://${hostname}:${port}`))
})
