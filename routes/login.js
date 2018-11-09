
const express = require('express');
const router = express.Router();

let User = require('../models/Login').Class;

router.post('/login', (req, res) => {
    var user_name = req.body.user_name;
    var user_pwd = req.body.user_pwd;
    if(user_name === '') {
        res.send({
            msg: '请填写用户名'
        })
        return;
    }
    if(user_pwd === '') {
        res.send({
            msg: '请填写密码'
        })
        return;
    }
    var user = new User;
    user.handelLogin(user_name, user_pwd, (err, data) => {
        if(err) {
            console.log(err, 555)
            // 当登录失败时 记录次数
            var user = new User();     
            user.handelLoginError(user_name, (err, data) => {
                if(err) {
                    console.log(err,999)
                    res.send({
                        code: 2,
                        msg: err
                    })
                } else {
                    res.send({
                        msg: '密码不正确2',
                        code: 1
                    })
                }
            })
            // res.send({
            //     msg: err,
            //     code: 1
            // })
        } else {
            res.send({
                data: data,
                msg: 'ok',
                code: 8
            })
        }
    })
})

// router.post()

module.exports = router;