const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

//创建UserSchema
const userSchema = new Schema({
  userId: ObjectId,
  userName: {
    unique: true,
    type: String
  },
  passWord: Boolean,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
});

//发布模型
mongoose.model('User', userSchema);