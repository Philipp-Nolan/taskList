'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    body: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
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
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
  });
  return Task;
};