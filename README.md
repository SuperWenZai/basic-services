# 介绍

Basic-Services 是使用koa2搭建的api服务,使用ejs模板引擎，并且配置了database链接mongoDB数据库服务;

# 安装&运行

1. 项目根目录下 `npm install` 安装所需依赖；
2. 安装所需依赖后，项目根目录下，运行 `npm run confirmLog` 检查是否有logs日志目录；
3. 然后运行 `npm run dev` 即可；

# 项目目录结构
```
miniBoms                           // 根目录
  ├── README.md                    // 项目介绍（本文）
  ├── app                          // 接口逻辑相关
  │   ├── controller               // 接口逻辑配置
  │   │   ├── base                 // 基础系统接口
  │   │   └── product              // 餐品系统接口
  │   └── error                    // 接口异常
  │       ├── ApiError.js
  │       └── ApiErrorNames.js
  ├── config                       // 项目配置
  │   ├── development.js
  │   ├── index.js
  │   ├── log_config.js
  │   └── production.js
  ├── database                     // 数据库相关
  │   ├── init.js                  // 数据库入口
  │   └── schema                   // 配置相关数据表
  │       └── User.js
  ├── logs                         // 接口日志系统记录
  │   ├── error
  │   └── response
  ├── main.js                      // 项目入口
  ├── middlewares                  // 接口中间件
  │   ├── logger.js
  │   └── response_formatter.js
  ├── package.json                 // npm 的包管理文件
  ├── route                        // 接口路由api配置
  │   └── api
  │       ├── index.js
  │       └── routes.js
  ├── static                       // 静态文件存放
  │   └── image.png
  ├── util                         // 项目插件包
  │   ├── IPv4_util.js
  │   ├── logPath_util.js
  │   └── log_util.js
  └── view                         // ejs页面代码
      ├── index.ejs
      └── login.ejs
```