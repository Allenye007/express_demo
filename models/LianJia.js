// 引包
var Sequelize = require('sequelize');

// 引配置
let sequelizeInstance = require('../config/configDB.js').sequelize;

// 定义字段名
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

sequelizeInstance.sync({force: false});  // 同步DB


class handelLianJia {
    // 定义属性
    get id() { return this._id; }
    set id(value) { this._id = value; }

    get title() { return this._title; }
    set title(value) { this._title = value; }

    get lab1() { return this._lab1; }
    set lab1(value) { this._lab1 = value; }

    get lab2() { return this._lab2; }
    set lab2(value) { this._lab2 = value; }

    get address1() { return this._address1; }
    set address1(value) { this._address1 = value; }

    get address2() { return this._address2; }
    set address2(value) { this._address2 = value; }

    get area() { return this._area; }
    set area(value) { this._area = value; }

    get price() { return this._price; }
    set price(value) { this._price = value; }

    get priceSec() { return this._priceSec; }
    set priceSec(value) { this._priceSec = value; }

    get href() { return this._href; }
    set href(value) { this._href = value; }

    get imgSrc() { return this._imgSrc; }
    set imgSrc(value) { this._imgSrc = value; }


    // 定义方法

    // 获取列表
    getLianJianList(page, size, P, cb) {
        return LianJia.findAndCountAll({
            where: P,
            offset:page * size || 0,
            limit:size || 50,
            order:[
                ['id','ASC']  // DESC
            ]
        })
        .then(R => {
            cb(null, R);
        })
        .catch(E => {
            cb(E, null);
        })
    }
}

exports.Class = handelLianJia
