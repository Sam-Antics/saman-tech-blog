const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

// create the Post model
class Post extends Model {}
    
  // Configure Post table
  Post.init (
    {
      id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
      },
      post_title: {
        type: DataTypes.STRING,
        allownull: false
      },
      post_content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
          }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );
  
  
  module.exports = Post;