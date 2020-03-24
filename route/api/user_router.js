const router = require('koa-router')();
const user_controller = require('../../app/controller/user_controller');

router.get('/getUser',user_controller.getUser);
router.post('/registerUser', user_controller.registerUser);

module.exports = router;