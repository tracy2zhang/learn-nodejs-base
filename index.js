const mod1 = require('./module/module1');
const mod2 = require('./module/module1');
const chalk = require('chalk');
console.log(mod1.obj.url);
mod1.logUrl();
mod1.changeUrl('fff');
console.log(mod1.obj.url);
mod1.logUrl();
mod1.logUrl = 1;
console.log(mod1);
