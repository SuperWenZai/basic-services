const mongoose = require('mongoose')
const ApiError = require('../../error/ApiError');
const ApiErrorNames = require('../../error/ApiErrorNames');

// 用户注册
exports.login = async ctx => {
  const User = mongoose.model('User');

  let user = await User.find({
    userName: ctx.request.body.userName
  },{_id:0}).exec();

  if(user.length && user[0].passWord === ctx.request.body.passWord){
    ctx.body = user;
  }else if(user.length && user[0].passWord !== ctx.request.body.passWord){
    throw new ApiError(ApiErrorNames.USER_PASSWORD_ERROE);
  }else{
    throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
  }
  // console.log('user',user)
}