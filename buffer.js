// Buffer用于处理二进制数据流
// 实例类似整数数组，但是大小固定不能变化
// C++代码在V8堆外分配物理内存
console.log(Buffer.alloc(10));
console.log(Buffer.alloc(20));
console.log(Buffer.alloc(5, 1));
console.log(Buffer.allocUnsafe(5));
console.log(Buffer.from([1, 2, 3]));
console.log(Buffer.from('ABC'));
console.log(Buffer.from('test').length);
console.log(Buffer.from('test', 'base64').length);
console.log(Buffer.allocUnsafeSlow(10).length);

console.log(Buffer.byteLength('test'));
console.log(Buffer.byteLength('测试'));
console.log(Buffer.isBuffer('aaa'));
console.log(Buffer.isBuffer(Buffer.from('aaa')));

const buf1 = Buffer.from('This');
const buf2 = Buffer.from('is');
const buf3 = Buffer.from('a');
const buf4 = Buffer.from('test');
const buf5 = Buffer.from('!');
const buf6 = Buffer.from('!');
const buf = Buffer.concat([buf1, buf2, buf3, buf4, buf5, buf6]);
console.log(buf, buf.toString());

console.log(Buffer.alloc(10).fill(255, 1, 8));
console.log(buf5.equals(buf6), buf5.equals(buf4));