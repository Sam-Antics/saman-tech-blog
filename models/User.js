const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// giving Model characteristics to User
class User extends Model {}

// table definitions
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user'
  }
);


// export the User model
module.exports = User;