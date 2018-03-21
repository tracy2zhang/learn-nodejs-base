const path = require('path');
const { 
  basename, dirname, extname, join, normalize, resolve, 
  relative, parse, format, sep, delimiter, win32, posix
} = path
console.log(path.join(__dirname, 'foo/bar', '..', './aaa', 'bbb'));
console.log(path.resolve('foo/bar', '..', './aaa', 'bbb'));
