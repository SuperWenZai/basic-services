const router = require('koa-router')();
const user_controller = require('../../app/controller/user_controller');

// users 开始
router.get('/getUser',user_controller.getUser);
router.post('/registerUser', user_controller.registerUser);
// users 结束

module.exports = router;