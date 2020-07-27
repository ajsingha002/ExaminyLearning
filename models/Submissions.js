const { Sequelize } = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('submissions', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  assignmentId: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  examId: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  file_link: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
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
}, {
  tableName: 'submissions',
  freezeTableName: true
});

