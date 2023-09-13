const User = require('./User');
const CrossSet = require('./CrossSet');

User.hasMany(CrossSet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


module.exports = { User};
