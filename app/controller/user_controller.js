// 获取用户信息
exports.getUser = async (ctx) => {
  ctx.body = {
    username: 'arwenfang',
    age: 23
  };
};

// 用户注册
exports.registerUser = async (ctx) => {
  ctx.body = ctx.request.body;
};