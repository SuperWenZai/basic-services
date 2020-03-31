const mongoose = require('mongoose')
const ApiError = require('../../error/ApiError');
const ApiErrorNames = require('../../error/ApiErrorNames');

// 用户注册
exports.register = async ctx => {
  const User = mongoose.model('User')
  let oneUser = new User({
    userName: ctx.request.body.userName,
    passWord: ctx.request.body.passWord
  })

  await oneUser
    .save()
    .then(() => {
      console.log('插入成功!')
      ctx.body = ctx.request.body;
    })
    .catch(error => {
      if (error.code === 11000) {
        console.log('插入失败!')
        throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
        // ctx.body = error;
      }else{
        ctx.body = error;
      }
    })

  // let user = await User.find({
  //   userName: ctx.request.body.userName
  // }).exec();
  // console.log('user',user)
}