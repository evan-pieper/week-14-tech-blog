const User = require('./User');
const Blogpost = require('./Blogpost');


/*User.hasMany(CrossSet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});*/


module.exports = {User, Blogpost};
