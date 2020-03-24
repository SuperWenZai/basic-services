const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const api = require('./route/api');
const config = require('./config');
const util = require('./util/util');
const response_formatter = require('./middlewares/response_formatter');

const app = new Koa();

app.use(bodyparser());

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
})); //添加模版引擎

//添加格式化处理响应结果的中间件，在添加路由之前调用 全局
// app.use(response_formatter);

//仅对/api开头的url进行格式化处理
app.use(response_formatter('^/api'));

router.use('/api', api.routes(), api.allowedMethods());

router.get('/', async (ctx) => {
  let title = 'hello koa2 ejs';
  await ctx.render('index', {
    title
  })
});

// router.get('/', async (ctx) => {
//   //显示表单页面
//   let html = `
//    <h1>Koa2 request POST</h1>
//    <form method="POST" action="/api/users/registerUser">
//        <p>userName</p>
//        <input name="userName" /><br/>
//        <p>age</p>
//        <input name="age" /><br/>
//        <button type="submit">submit</button>
//    </form>
//   `;
//   ctx.body = html;
// })

app
  .use(router.routes())
  .use(router.allowedMethods()); /*启动路由*/

app.listen(config.port, () => {
  console.log(`> [server start] http://localhost:${config.port}`);
  console.log(`> [server start] http://${util.getIPv4()}:${config.port}`);
});