const { Sequelize } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('classes', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  courseId: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  topic: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.fn('now'),
    allowNull: true
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.fn('now'),
    allowNull: true
  },
  createdBy: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.fn('now'),
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});
