const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Group = require('./Group');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.belongsToMany(Group, {
  through: 'user_group',
  as: 'group',
  foreignKey: 'user_id',
});

Group.belongsToMany(User, {
  through: 'user_group',
  as: 'user',
  foreignKey: 'group_id',
});

Post.belongsTo(Group, {
  foreignKey: 'group_id',
});

Group.hasMany(Post, {
  foreignKey: 'group_id',
});

module.exports = {
  Group,
  User,
  Post,
  Comment,
};
