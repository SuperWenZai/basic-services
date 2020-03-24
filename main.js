const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const api = require('./route/api');
const config = require('./config');
const IPv4Util = require('./util/IPv4_util');
const responseFormatter = require('./middlewares/response_formatter');
const logUtil = require('./util/log_util');

const app = new Koa();
const port = config.port || '3000';

app.use(bodyparser());

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
})); //添加模版引擎

//添加格式化处理响应结果的中间件，在添加路由之前调用 全局
// app.use(responseFormatter);

//仅对/api开头的url进行格式化处理
app.use(responseFormatter('^/api'));

// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  let ms;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);

  } catch (error) {
    
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

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