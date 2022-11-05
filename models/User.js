const mongoose = require('mongoose');
const validator = require('validator');
var bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, 'Provide a valid Email'],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email address is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 3,
            minUppercase: 2,
            minSymbols: 1,
          }),
        message: 'Password {VALUE} is not strong enough!',
      },
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password doesn't match",
      },
    },
    role: {
      type: String,
      enum: ['buyer', 'store-manager', 'admin'],
    },
    firstName: {
      type: String,
      required: [true, 'please provide a first name'],
      trim: true,
      minLength: [3, 'too small'],
      maxLength: [100, 'too long'],
    },
    lastName: {
      type: String,
      required: [true, 'please provide a first name'],
      trim: true,
      minLength: [3, 'too small'],
      maxLength: [100, 'too long'],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        'Please provide a valid phone number',
      ],
    },
    shippinAddress: String,
    imagrURL: {
      type: String,
      validate: [validator.isURL, 'Plesae provide a valid url'],
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive', 'blocked'],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.matchPassword = function (password, hash) {
  const isPasswordMatched = bcrypt.compareSync(password, hash);
  return isPasswordMatched;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
