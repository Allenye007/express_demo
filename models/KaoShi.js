// 引包
var Sequelize = require('sequelize');

// 引配置
let sequelizeInstance = require('../config/configDB.js').sequelize;

const Op = Sequelize.Op;

// 定义字段名
const kaoshi = sequelizeInstance.define('kaoshi1', {
    // 定义字段
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        AUTO_INCREMENT: true
    },
    title: {
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


class handelKaoShi {
    // 定义属性
    get id() { return this._id; }
    set id(value) { this._id = value; }

    get title() { return this._title; }
    set title(value) { this._title = value; }

    // 获取列表
    query(title, cb) {
        return kaoshi.findAll({
            where: {
                title:{
                    [Op.like]:'%' +title + '%'
                }
            }
        })
        .then(R => {
            cb(null, R)
        })
        .catch(E => {
            cb(E, null)
        })
    }
}

exports.Class = handelKaoShi
