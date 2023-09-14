const sequelize = require('../config/connection');
const {User, Blogpost} = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogposts = await Blogpost.bulkCreate(blogpostData);
  
  process.exit(0);
};

seedDatabase();
console.log('Seeds Loaded!');
