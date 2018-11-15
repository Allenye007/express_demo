
const express = require('express');
const router = express.Router();

const {handelSetRedis, handelGetRedis} = require('../util/redis');

let User = require('../models/Login').Class;

// 登录
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
    var user = new User();
    user.handelLogin(user_name, user_pwd, (err, data) => {
        if(err) {
            // console.log(err, 555)
            // 当登录失败时 记录次数
            var user = new User();     
            user.handelLoginError(user_name, (err, data) => {
                if(err) {
                    // console.log(err,999)
                    res.send({
                        code: 2,
                        msg: err
                    })
                } else {
                    res.send({
                        msg: '密码不正确',
                        code: 1
                    })
                }
            })
            // res.send({
            //     msg: err,
            //     code: 1
            // })
        } else {
            var k = 123;
            var t= 't'
            handelSetRedis(k, t);
            res.send({
                data: data,
                msg: 'ok',
                code: 8,
                k: k,
            })
        }
    })
})
// 注册
router.post('/registUser', (req, res) => {
    var phone = req.body.phone;
    var user_name = req.body.user_name;
    var user_pwd = req.body.user_pwd;
    var user = new User()
    user.handelRegist(user_name, user_pwd, phone, (err, data) => {
        if(err) {
            res.send({
                msg: err,
                code: 1
            })
        }else {
            res.send({
                msg: data,
                code: 8,
            })
        }
    })
})
// 修改密码
router.post('/changePWD', (req, res) => {
    var user_name, user_pwd, new_user_pwd;
    user_name = req.body.user_name;
    user_pwd = req.body.user_pwd;
    new_user_pwd = req.body.new_user_pwd;

    if(user_pwd === new_user_pwd) {
        return res.send({
            msg: '您的新旧密码相同',
            code: 2
        })
    }
    let user = new User();
    user.handelChangePWD(user_name, new_user_pwd, (err, data) => {
        if(err) {
            res.send({
                msg: err,
                code: 1
            })
        } else {
            res.send({
                msg: data,
                code: 8
            })
        }
    })
})



module.exports = router;