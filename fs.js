const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify

const readFile = promisify(fs.readFile)
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

readFile('./fs.js', 'utf8').then(data => {
  console.log(data)
})

// readdir(path.join(__dirname, 'module')).then(files => {
//   console.log(files)
// })

// const rs = fs.createReadStream('./index.js')
// rs.pipe(process.stdout)

async function log (_path, index = 0) {
  try {
    const fStat = await stat(_path)
    if (fStat.isDirectory()) {
      const files = await readdir(_path)
      console.log(' '.repeat(index * 5) + path.basename(_path))
      for (let file of files) {
        await log(path.join(_path, file), index + 1)
      }
    } else if (fStat.isFile()) {
      console.log(' '.repeat(index * 5) + path.basename(_path))
    }
  } catch (err) {
    console.log(err)
  }
}

log(path.join(__dirname, 'typings'))
stat('./fs.js').then(data => {
  console.log('文件存在')
}).catch(err => {
  console.log('文件不存在', err)
})
