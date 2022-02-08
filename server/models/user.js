'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants')

async function hashPassword(user, options) {
  if (user.changed('password')) {
    const { password } = user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    user.password = hashedPassword
  }
}



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        targetKey: 'id'
      });
      User.hasMany(models.Task, {
        foreignKey: 'userId',
        targetKey: 'id',
      });

    }
    async comparePassword(password) {
      return await bcrypt.compare(password, this.getDataValue('password'))
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING(64),
      field: 'first_name',
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    lastName: {
      type: DataTypes.STRING(64),
      field: 'last_name',

    },
    nickname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });

  User.beforeCreate(hashPassword);

  User.beforeBulkUpdate(async (user, options) => {
    if (user.attributes.password) {
      const { attributes: { password } } = user
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      user.attributes.password = hashedPassword
    }
  });


  return User;
};  