const {host,config} = require('./config');
//  配置数据库
// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : '12345678',
//   // database        : 'db_zxtrade'
//   database        : 'demo'
// });

// // 导出数据库
// module.exports = pool;


const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.dbName, config.user, config.pwd, {
    // host: 'localhost',
    host: host,
    dialect: config.dialect,
    pool: {
      max: config.max,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
});

sequelize
  .authenticate()
  .then(()=>{
      console.log('App启动，数据库连接成功');
  })
  .catch(err => {
      console.log(err);
  });

exports.sequelize = sequelize;