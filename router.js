// 引包
const express = require('express')
const app = express();


// 引入routes  引流
const user = require('./routes/user');
const userList = require('./routes/user');
const bigAge = require('./routes/user');
const addQrCode = require('./routes/user');
const deleteQrCode = require('./routes/user');
const qr = require('./routes/qrCode');

// 纤细美
const xxmUser = require('./routes/xxmUser');


// 链家
const lianJia = require('./routes/lianJia');


// 考试
const kaoShi = require('./routes/kaoShi.js');


// 登录
const login = require('./routes/login');


// 转发
app.use('/demo', login);
app.use('/demo', qr);
app.use('/demo', userList);
app.use('/demo', bigAge);
app.use('/demo', addQrCode);
app.use('/demo', deleteQrCode);

app.use('/demo', xxmUser);
app.use('/lianJia', lianJia);
app.use('/demo/kaoShi', kaoShi);







// 导出 app
module.exports = app;


