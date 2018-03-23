const EventEmitter = require('events')

class Hub extends EventEmitter {

}

const hub = new Hub()

hub.on('test', console.log)

// setTimeout(hub.emit, 1000, 'test', 'ok')
setTimeout(hub.emit.bind(hub, 'test', 'ok', 1, 2), 1000)

setTimeout((...args) => {
  console.log(args)
  hub.emit('test', 'ok')
}, 2000, 1, 2, 3)
