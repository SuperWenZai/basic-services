const mongoose = require('mongoose');
const glob = require('glob');
const {
  resolve
} = require('path');
const config = require('../config');
const db = config.mongodb_url; //配置你的数据库链接

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
};

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db);
  let maxConnectTimes = 0; //重连3次 断开连接 不重新连

  return new Promise((resolve, reject) => {
    //添加数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('************数据库断开');
      if (maxConnectTimes <= 3) {
        maxConnectTimes += 1;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error('数据库链接出现问题，请检查代码')
      }
    })

    mongoose.connection.on('error', () => {
      console.log('************数据库错误');
      if (maxConnectTimes <= 3) {
        maxConnectTimes += 1;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error('数据库链接出现问题，请检查代码')
      }
    })

    mongoose.connection.on('open', () => {
      console.log('************数据库连接成功');
      resolve();
    })
  })
};