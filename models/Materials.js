const { Sequelize } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('materials', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  courseId: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_link: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  updatedBy: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});
