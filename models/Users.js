const { Sequelize } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('users', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  permission: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
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
