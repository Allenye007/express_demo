
const express = require('express');
const router = express.Router();

let LianJia = require('../models/LianJia.js').Class;

router.get('/list', (req, res) => {
    let page = Number(req.query.page);
    let size = Number(req.query.size);
    let P = {};
    console.log(page, size);
    let lianJia = new LianJia();
    lianJia.getLianJianList(page, size, P, (err, data) => {
        if(err) {
            res.send({
                code: 1,
                msg: err
            })
        } else {
            res.send({
                code: 0,
                msg: data,
            })
        }
    })
})

router.get('/title', (req, res) => {
    let P = req.query;
    let lianJia = new LianJia();
    lianJia.getByName(P, (err, data) => {
        if(err) {
            res.send({
                code: 1,
                msg: err
            })
        } else {
            res.send({
                code: 0,
                msg: data
            })
        }
    })
})

router.get('/price', (req, res) => {
    let P = req.query;
    console.log(P)
    console.log(Number(P.startMonery));
    if(P.startMonery === '') {
        return res.send({
            code: 2,
            msg: '起始价没有输入！'
        })
    }
    if(P.endMonery === '') {
        return res.send({
            code: 3,
            msg: '结束价没有输入！'
        })
    }

    if(Number(P.startMonery) >= Number(P.endMonery)) {
        return res.send({
            code: 4,
            msg: '请输入正确的价格！'
        })
    }
    let lianJia = new LianJia();
    lianJia.getByMonery(P, (err, data) => {
        if(err) {
            res.send({
                code: 1,
                msg: err
            })
        } else {
            res.send({
                code: 0,
                msg: data
            })
        }
    })
})

router.get('/detail', (req, res) => {
    let P = req.query;
    if(P.id === '') {
        res.send({
            code: 2,
            msg: '请输入ID'
        })
    }
    let lianJia = new LianJia();
    lianJia.getById(P, (err, data) => {
        if(err) {
            res.send({
                code: 1,
                msg: err
            })
        } else {
            res.send({
                code: 0,
                msg: data
            })
        }
    })
})

module.exports = router
// export default router