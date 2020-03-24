const path = require('path');

//日志根目录
const baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
const errorPath = "/error";
//错误日志文件名
const errorFileName = "error";
//错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// const errorLogPath = path.resolve(__dirname, "../logs/error/error");


//响应日志目录
const responsePath = "/response";
//响应日志文件名
const responseFileName = "response";
//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// const responseLogPath = path.resolve(__dirname, "../logs/response/response");

module.exports = {
  "appenders": {
    "out": { "type": 'console' },
    "errorLogger": {
    "type": "dateFile",
    "filename": errorLogPath,
    "encoding": "utf-8",
    "maxLogSize": 2000000,
    "numBackups": 5,
    "pattern": "-yyyy-MM-dd.log",
    "alwaysIncludePattern": true,
    "path": errorPath //自定义属性，错误日志的根目录
    },
    "resLogger": {
    "type": "dateFile",
    "filename": responseLogPath,
    "encoding": "utf-8",
    "maxLogSize": 2000000,
    "numBackups": 5,
    "pattern": "-yyyy-MM-dd.log",
    "alwaysIncludePattern": true,
    "path": responsePath
    }
    },
    "categories": {
    "default": {"appenders": ['out'], "level": 'info'},
    "errorLogger": {"appenders": ['errorLogger'], "level": 'error'},
    "resLogger": {"appenders": ['resLogger'], "level": 'info'},
    },
    // "levels":{
    // "errorLogger":"ERROR",
    // "resLogger":"ALL"
    // },
    "baseLogPath": baseLogPath //logs根目录
}

// module.exports = {
//   "appenders": [
//     //错误日志
//     {
//       "category": "errorLogger", //logger名称
//       "type": "dateFile", //日志类型
//       "filename": errorLogPath, //日志输出位置
//       "alwaysIncludePattern": true, //是否总是有后缀名
//       "pattern": "-yyyy-MM-dd-hh.log", //后缀，每小时创建一个新的日志文件
//       "path": errorPath //自定义属性，错误日志的根目录
//     },
//     //响应日志
//     {
//       "category": "resLogger",
//       "type": "dateFile",
//       "filename": responseLogPath,
//       "alwaysIncludePattern": true,
//       "pattern": "-yyyy-MM-dd-hh.log",
//       "path": responsePath
//     }
//   ],
//   /**
//    * 设置logger名称对应的的日志等级
//    * ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF（OFF是用来关闭日志记录的，
//    * 不是日志记录的一个级别。如果使用了 OFF，则不需要调用 logger.off('some log message')来关闭日志
//    */
//   "levels": {
//     "errorLogger": "ERROR",
//     "resLogger": "ALL"
//   },
//   "baseLogPath": baseLogPath //logs根目录
// }