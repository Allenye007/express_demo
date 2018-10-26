//  配置数据库
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'allen',
  password        : 'allen',
  database        : 'express_demo'
});

// 导出数据库
module.exports = pool;


// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('express_demo', 'allen', 'allen', {
//     host: 'localhost',
//     dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
  
//     pool: {
//       max: 5,
//       min: 1,
//       acquire: 30000,
//       idle: 10000
//     },
  
//     // 仅限 SQLite
//     storage: 'path/to/database.sqlite'
//   });

//   sequelize
//     .authenticate()
//     .then(()=>{
//         console.log('App启动，数据库连接成功');
//     })
//     .catch(err => {
//         console.log(err);
//     });

// exports.sequelize = sequelize;