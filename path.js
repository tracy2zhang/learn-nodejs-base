const path = require('path');
const { 
  basename, dirname, extname, join, normalize, resolve, 
  relative, parse, format, sep, delimiter, win32, posix
} = path
console.log(path.join(__dirname, 'foo/bar', '..', './aaa', 'bbb'));
console.log(path.resolve('foo/bar', '..', './aaa', 'bbb'));

console.log('__filename        ', __filename);
console.log('__dirname         ', __dirname);
console.log('process.cwd()     ', process.cwd());
console.log('path.resolve("./")', path.resolve('./'));

// __dirname, __filename总是返回文件夹或文件的绝对路径
// process.cwd(), path.resolve()等总是返回执行node命令所在的文件夹
// 在require方法中总是相对当前文件所在文件夹
// 在其他地方相对node启动文件夹
