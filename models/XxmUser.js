
// 纤喜美
const Sequelize = require('sequelize');  // 引包
let sequelizeInstance = require('../config/configDB.js').sequelize;  // 引配置

const User = sequelizeInstance.define('xxmUser', {
    // 还没跟数据库同步
    // 字段
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        primaryKey:true
    },
    sex: {
        type: Sequelize.TINYINT,
        defaultValue: '0'  // 默认值    1男  2女  0未知
    },
    height: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    weight: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    city: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    phone: {
        type: Sequelize.STRING, // STING   defaultValue '' 手机号
        defaultValue: ''
    },
    // 每天的登录次数
    wxChatNumber: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
},{
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

sequelizeInstance.sync({force: false});

class handelXxmUser {
    // 属性
    get id() { return this._id; }
    set id(value) { this._id = value; }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get sex() { return this._sex; }
    set sex(value) { this._sex = value; }

    get height() { return this._height; }
    set height(value) { this._height = value; }

    get weight() { return this._weight; }
    set weight(value) { this._weight = value; }

    get city() { return this._city; }
    set city(value) { this._city = value; }

    get phone() { return this._phone; }
    set phone(value) { this._phone = value; }

    get wxChatNumber() { return this._wxChatNumber; }
    set wxChatNumber(value) { this._wxChatNumber = value; }


    handelRegist(P, cb) {
        return User.create({
            name : P.name,
            sex : P.sex,
            height : P.height,
            weight : P.weight,
            city : P.city,
            phone : P.phone,
            wxChatNumber : P.wxChatNumber
        })
        .then(R => {
            cb(null, R);
        }, E => {
            cb(E, null)
        })
    }


}

exports.Class = handelXxmUser;