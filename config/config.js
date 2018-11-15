
let workers = require('os').cpus().length;
let host = 'localhost';
// 配置DB
const config = {
    dbName:'demo',
    user:'root',
    pwd:'12345678',
    dialect: 'mysql',
    port:3306,
    max:workers,
    min:1,
    acquire:30000,
    idle:10000
};
// 配置Redis
const redisConfig = {
    host:'localhost',
    port:'6379'
};

module.exports = {
    host,
    config,
    redisConfig
};