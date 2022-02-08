'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate({ User }) {
      RefreshToken.belongsTo(User, {
        foreignKey: 'userId',
      })
    }
  };
  RefreshToken.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      validate: {
        notNull: true,
      }
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: false,
      }

    },
    userAgent: {
      type: DataTypes.STRING
    },
    fingerPrint: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    underscored: true,
  });
  return RefreshToken;
};