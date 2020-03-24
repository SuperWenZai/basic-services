const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const views = require('koa-views');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const os = require('os');
const app = new Koa();

let listenPort = 3000; //端口

let getIPv4 = () => {
  //同一接口可能有不止一个IP4v地址，所以用数组存
  let ipv4s = [];
  //获取网络接口列表对象
  let interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach(function (key) {
    interfaces[key].forEach(function (item) {
      //跳过IPv6 和 '127.0.0.1'
      if ('IPv4' !== item.family || item.internal !== false) return;
      ipv4s.push(item.address); //可用的ipv4s加入数组
      // console.log(key + '--' + item.address);
    })
  })
  return ipv4s[0]; //返回一个可用的即可
}

app.use(cors()); //解决跨域
app.use(bodyparser());

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
})); //添加模版引擎

// 配置静态web服务的中间件
app.use(static(path.join(__dirname, './static')));

router.get('/', async (ctx) => {
  //显示表单页面
  let html = `
   <h1>Koa2 request POST</h1>
   <form method="POST" action="/set">
       <p>userName</p>
       <input name="userName" /><br/>
       <p>age</p>
       <input name="age" /><br/>
       <button type="submit">submit</button>
   </form>
  `;
  ctx.body = html;
})

router.get('/index', async (ctx) => {
  let title = 'hello koa2 ejs';
  await ctx.render('index', {
    title
  })
});

router.post('/set', async (ctx) => {
  console.log(ctx.method)
  let postData = ctx.request.body;
  ctx.body = postData;
})

router.get('/menu', async (ctx) => {
  ctx.body = 'Hello World menu';
})

app
  .use(router.routes())
  .use(router.allowedMethods()); /*启动路由*/

app.listen(listenPort, () => {
  console.log(`> [server start] http://localhost:${listenPort}`);
  console.log(`> [server start] http://${getIPv4()}:${listenPort}`);
});