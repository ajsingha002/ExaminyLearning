const { Sequelize } = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('exams', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  exam_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  courseId: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  exam_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reference: {
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
  tableName: 'exams'
});
