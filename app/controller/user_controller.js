// 获取用户信息
exports.getUser = async (ctx) => {
  ctx.body = {
    username: '阿，希爸',
    age: 30
  };
};

// 用户注册
exports.registerUser = async (ctx) => {
  ctx.body = ctx.request.body;
};