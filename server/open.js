const { exec } = require('child_process')
const platform = process.platform

exports.open = function (url) {
  switch (platform) {
    case 'darwin':
      exec(`open ${url}`)
      break
    case 'win32':
      exec(`start ${url}`)
      break
  }
}
