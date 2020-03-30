const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const static = require('koa-static');
const {
  connect,
  initSchemas
} = require('./database/init')
const api = require('./route/api');
const config = require('./config');
const IPv4Util = require('./util/IPv4_util');
const responseFormatter = require('./middlewares/response_formatter');
const logger = require('./middlewares/logger');

const mongoose = require('mongoose');

const app = new Koa();
const port = config.port || '3000';

//连接数据库
;
(async () => {
  await connect()
  initSchemas()

  const User = mongoose.model('User');
  let oneUser = new User({
    userName: 'arwenfang',
    passWord: '123456'
  });

  oneUser.save().then(() => {
    console.log('插入成功!');
  }).catch((error)=>{
    console.log('插入失败:',error)
  });

  let user = await User.findOne({}).exec();
  console.log('------------user------------')
  console.log(user);
  console.log('------------user------------')
})()

app.use(bodyparser());

// 配置静态web服务的中间件
app.use(static(path.join(__dirname, '/')));

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
})); //添加模版引擎

//添加格式化处理响应结果的中间件，在添加路由之前调用 全局
// app.use(responseFormatter);

//仅对/api开头的url进行格式化处理
app.use(responseFormatter('^/api'));

// logger
app.use(logger);

router.use('/api', api.routes(), api.allowedMethods());

router.get('/', async (ctx) => {
  let title = 'hello koa2 ejs';
  await ctx.render('index', {
    title
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods()); /*启动路由*/

app.listen(port, () => {
  console.log(`> [server start] http://localhost:${config.port}`);
  console.log(`> [server start] http://${IPv4Util.getIPv4()}:${config.port}`);
});