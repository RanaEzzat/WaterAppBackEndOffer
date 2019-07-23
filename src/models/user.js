var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Offer = mongoose.Schema.Types.Offer;
  
var UserSchema = new mongoose.Schema({
  email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
  password: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
      },
      region: {
        type: String,
        required: true,
        trim: true,
      },
      building: {
        type: Number,
        required: true,
        min: 0
      },
      points: {
        type: Number,
        required: false,
        min: 0
      },
      vouchers: {
        type: [Offer],
        status:[String],
        required: false,
      },
    
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: Date
});
 
UserSchema.pre('save',  function(next) {
    var user = this;
 
     if (!user.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
 
             user.password = hash;
             next();
         });
     });
});
 
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);