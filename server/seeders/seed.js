const db = require('../config/connection');
const { User, Group } = require('../models');
const userSeeds = require('./userSeeds.json');
const groupSeeds = require('./groupSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Group', 'groups');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    await Group.create(groupSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
