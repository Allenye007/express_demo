const express = require('express');
const router = express.Router();

let User = require('../models/User').Class;

const fs = require('fs');

//  模块的默认操作会根据 Node.js 应用程序运行的操作系统的不同而变化。 

//  比如，当运行在 Windows 操作系统上时，path 模块会认为使用的是 Windows 风格的路径。
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

router.get('/list', (req,res) => {
    var user = new User();
    user.getUserList(((err, data) => {
        if(err) {
            res.send({
                err_msg: err
            })
        } else {
            res.send({
                err_msg: 'ok',
                data: data,
            })
        }
    }))
})

router.get('/bigAge', (req, res) => {
    var uid = req.query.uid;
    uid = Number(uid);
    var user = new User();
    user.getUid(uid,(err, data) => {
        if(err) {
            res.send({
                data: err
            })
        } else {
            res.send({
                data: data
            })
        }
    })
})


// 添加QR
router.post('/addQrCode', (req, res) => {
    var user = new User();
    let url = req.body.url;
    let uid = req.body.uid;
    user.creatQrCode(url, uid, (err, data) => {
        if(err) {
            res.send({
                err_msg: err
            })
        } else {
            res.send({
                data: data
            })
        }
    })
})
// 删除QR
router.post('/deleteQrCode', (req, res) => {
    var id = req.body.id;
    console.log(id);
    var user = new User();
    user.deleteQrCode(id, (err, data) => {
        if(err) {
            res.send({
                code: 'no',
                err_msg: err
            })
        } else {
            res.send({
                code: 'ok',
                data: data
            })
        }
    })
})

// 返回用户二维码列表
router.get('/qrCodeList', (req, res) => {
    var uid = req.query.uid;
    var user = new User();
    user.getQrCodeList(uid, (err, data) => {
        if(err) {
            res.send({
                code: 'no',
                msg: err
            })
        } else {
            res.send({
                code: 'ok',
                data: data
            })
        }
    })
})

// 展示第一个 二维码
router.get('/showQrCode', (req, res) => {
    var uid = req.query.uid;
    var user = new User();
    user.getShowFirsrQRCode(uid, (err, data) => {
        if(err) {
            res.send({
                msg: err
            })
        } else {
            res.send({
                msg: 'ok',
                data: data
            })
            // 如果 这个接口 被调用 则 count + 1
            var id = data.id;
            var count = data.count + 1;
            user.updataQrCodeCount(id, count, (err, data) => {
                if(err) {
                    console.log(err, 212)
                } else {
                    console.log()
                }
            })
        }
    })
})

module.exports = router;
