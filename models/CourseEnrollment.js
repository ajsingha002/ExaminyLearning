const { Sequelize } = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../database');

module.exports = db.define('courseEnrollment', {
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
  userId: {
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
},{ 
  tableName: 'course_enrollment',
  freezeTableName: true
});
