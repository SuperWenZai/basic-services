const router = require('koa-router')();
const path = require('path');
const routes_list = require('./routes');

const controller_dir = '/app/controller'; //配置默认目录

for (var item of routes_list.routes) {
  console.log(`register URL mapping: http://localhost:3000/api/${item.method}${item.url}`);
  let mapping = require(path.join(__dirname, `../..${controller_dir + item.url}`));
  let method = item.method.toLowerCase();
  router[method](item.url, mapping[item.interfaceName]);
}

module.exports = router;