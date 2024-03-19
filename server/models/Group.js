const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const groupSchema = new Schema({
  name: {
    type: String,
    required: 'You need to have a name!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
});

const Group = model('Group', groupSchema);


module.exports = Group;

