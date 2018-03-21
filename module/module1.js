console.log('module1');

let url = 'https://www.boxfish.cn';
let obj = {
  url
}

function logUrl () {
  console.log(obj.url);
}

function changeUrl (newUrl = 'https://www.baidu.com') {
  url = newUrl;
  obj.url = newUrl;
}

module.exports = {
  url, logUrl, changeUrl, obj
}
