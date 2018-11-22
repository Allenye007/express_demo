
const express = require('express');
const router = express.Router();

let LianJia = require('../models/LianJia.js').Class;

router.get('/list', (req, res) => {
    let page = Number(req.query.page);
    let size = Number(req.query.size);
    let P = {};
    console.log(page, size);
    let lianJia = new LianJia()
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








module.exports = router
