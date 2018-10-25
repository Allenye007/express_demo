// 引包
const express = require('express')
const app = express();


// 引入routes  引流
const user = require('./routes/user');


// 转发
app.use('/demo/login', user);











// 导出 app
module.exports = app;


