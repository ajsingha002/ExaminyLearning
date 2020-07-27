const { Sequelize } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('courses', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  courseName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.fn('now'), 
    allowNull: false
  },
  createdBy: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.fn('now'), 
    allowNull: false
  },
  updatedBy: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});
