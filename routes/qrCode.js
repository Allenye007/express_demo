let QRCode = require('../models/QRCode').Class;

const express = require('express');
const router = express.Router();

router.get('/qr', (req, res) => {
    // 扫表的实例对象  就可以调用 QRCode的方法了
    var qrCode = new QRCode()
    qrCode.getUserList((err, data) => {
        if(err) {
            res.send({
                err_meg: err
            })
        } else {
            res.send({
                err_meg: 'ok',
                data: data
            })
        }
    })
})


module.exports = router;
