
const express = require('express');
const router = express.Router();

let KaoShi = require('../models/KaoShi.js').Class;

router.get('/query', (req, res) => {
    let title = req.query.title;

    var kaoShi = new KaoShi();

    kaoShi.query(title, (err, data) => {
        if(err) {
            res.send({
                msg: err,
                code: 1
            })
        } else {
            res.send({
                msg: data,
                code: 0
            })
        }
        
    })
    

})








module.exports = router
