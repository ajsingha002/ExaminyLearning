const { Sequelize } = require('sequelize');
const fs = require('fs');
let rawdata = fs.readFileSync('./config/database.json');
let config = JSON.parse(rawdata);
//console.log('postgres://'+config.username+':'+config.password+'@'+config.host+':'+config.port+'/'+config.dbname);
const sequelize = new Sequelize('postgres://'+config.username+':'+config.password+'@'+config.host+':'+config.port+'/'+config.dbname);
module.exports = sequelize;