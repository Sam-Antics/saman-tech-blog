const User = require('./User');
const Post = require('./Post');


// defines associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});




// export models
module.exports = { User, Post };