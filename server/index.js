const yargs = require('yargs')
const Server = require('./server')

const argv = yargs
  .usage('anydoor [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 9527
  }).option('h', {
    alias: 'host',
    describe: 'hostname',
    default: '127.0.0.1'
  }).option('d', {
    alias: 'dir',
    describe: 'root path',
    default: process.cwd()
  }).option('o', {
    alias: 'open',
    describe: 'open browser automatically',
    default: false
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv

const server = new Server(argv)
server.start()
