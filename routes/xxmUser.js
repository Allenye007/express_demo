
const express = require('express');

const router = express.Router();

let User = require('../models/XxmUser').Class;

router.post('/regist', (req, res) => {
    var P = req.body;
    // 缺判断
    if ( P ) {};
    const user = new User();
    user.handelRegist(P, (err, data) => {
        if(err) {
            res.send({
                msg: err,
                code: 1,
            })
        } else {
            res.send({
                msg: data,
                code: 8,
            })
        }
    })
})






module.exports = router;
