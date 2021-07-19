const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'please enter  name'],
    maxlength:[100,' name cannot exceeds 100 charecters']

  },
  email: {
    type: String,
    required: [true,'please enter  email'],
    unique:true,
    validate:[validator.isEmail,'Please Enter Valid Email']
  },
  password: {
    type: String,
    required: [true,'please enter  password'],
    minlength:[8,'Minimum Length 8'],
    select:false

  },
  avatar:{
      public_id:{
          type:String,
          required:false
      },
      url:{
          type:String,
          required:false
      }
  },
  role:{
      type:String,
      default:'user'
  },

    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date 
  
});
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
});
userSchema.methods.comperePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 30*60*1000
    return resetToken
}
module.exports = mongoose.model('EmpUser', userSchema);