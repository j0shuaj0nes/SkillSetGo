const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  givenName: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  familyName: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],

  country:
  {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },

  skillsOffering: [
    {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
  ],
  skillsInterestedIn: [
    {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;