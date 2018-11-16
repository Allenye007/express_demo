// 导入数据
const Sequelize = require('sequelize');  // 引包

let sequelizeInstance = require('../config/configDB').sequelize;  // 引配置

// 定义 微博 数据库字段-------------------------
const weiBo = sequelizeInstance.define('weiBoHotInfo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        AUTO_INCREMENT: true
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    href: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    num: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
},{
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
})

sequelizeInstance.sync({force: false});  // 同步DB

class handelWeiBo {
    // 定义属性
    get id() { return this._id; }
    set id(value) { this._id = value; }

    get title() { return this._title; }
    set title(value) { this._title = value; }

    get href() { return this._href; }
    set href(value) { this._href = value; }

    get num() { return this._num; }
    set num(value) { this._num = value; }

}
// ------------------------------------------------------------------------

// 定义 链家 数据库字段---------------------------

const LianJia = sequelizeInstance.define('lianJiaDB', {
    // 定义字段
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        AUTO_INCREMENT: true
    },
    // 小区名字
    title: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    lab1: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    lab2: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    address1: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    address2: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    // 具体地址
    address3: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    // 建筑面积
    area: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    // 每平方米
    price: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    // 底价
    priceSec: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    // 网址链接
    href: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    // 图片链接
    imgSrc: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
})

const fs = require('fs');
const path = require('path');
// 批量插入 链家 数据库
fs.readFile(path.resolve(__dirname, '../DATA/lianjia.json'), 'utf8', (err, data) => {
    if(err) {
        console.log(err, 1111);
    }
    console.log(data);
    // 插入微 链家 数据表
    LianJia.bulkCreate(JSON.parse(data))
        .then((R) => {
            console.log(R, 11111)
        })
        .catch(E => {
            console.log(E, 2222)
        })
});




/////////////////////////////////////////////////////
return;
// 批量插入 微博 数据库
fs.readFile(path.resolve(__dirname, '../DATA/weibo.json'), 'utf8', (err, data) => {
    if(err) {
        console.log(err, 1111);
    }
    // 插入微博数据表
    weiBo.bulkCreate(JSON.parse(data))
        .then((R) => {
            console.log(R)
        })
        .catch(err => {
            console.log(E)
        })
});



exports.Class = handelWeiBo;