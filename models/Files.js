const { Sequelize } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('files', {
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
  path: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
});
