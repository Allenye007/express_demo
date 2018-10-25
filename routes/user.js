const express = require('express');
const router = express.Router();

const fs = require('fs');
// 模块的默认操作会根据 Node.js 应用程序运行的操作系统的不同而变化。 
// 比如，当运行在 Windows 操作系统上时，path 模块会认为使用的是 Windows 风格的路径。
const path = require('path');


router.get('/user', (req, res, next) => {
    var content = req.query;
    fs.readFile(path.resolve(__dirname, '../DATA/tongzhuang/goodsList.json'), 'utf8', (err, data) => {
        let lists = {
            items:data
        }
        res.send({
            code: 0,
            msg: 'ok',
            data: [content,lists]
        })
    });
})

module.exports = router;
