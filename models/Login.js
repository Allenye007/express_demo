// 登录相关
const Sequelize = require('sequelize');  // 引包
let sequelizeInstance = require('../config/configDB.js').sequelize;  // 引配置

const User = sequelizeInstance.define('users123', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    user_name: {
        type: Sequelize.STRING,
        primaryKey:true
    },
    user_pwd: Sequelize.STRING,
    op: Sequelize.INTEGER,
    phone: Sequelize.INTEGER,
    sale_volume: Sequelize.INTEGER,
    login_count: Sequelize.INTEGER, // 每天的登录次数
    login_time: Sequelize.STRING, // 登录时间
    
},{
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,// 时间戳
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// 同步数据库实例
sequelizeInstance.sync({force: false});


// 封装方法 通过promise返回
class handelUser {
    // 定义属性
    get id() { return this._id; }
    set id(value) { this._id = value; }

    get user_name() { return this._user_name; }
    set user_name(value) { this._user_name = value; }

    get user_pwd() { return this._user_pwd; }
    set user_pwd(value) { this._user_pwd = value; }

    get op() { return this._op; }
    set op(value) { this._op = value; }

    get phone() { return this._phone; }
    set phone(value) { this._phone = value; }

    get sale_volume() { return this._sale_volume; }
    set sale_volume(value) { this._sale_volume = value; }

    get login_count() { return this._login_count; }
    set login_count(value) { this._login_count = value; }

    get login_time() { return this._login_time; }
    set login_time(value) { this._login_time = value; }

    // 方法

    // 登录
    handelLogin(user_name, user_pwd, cb) {
        return User.findOne({
            where: {
                user_name: user_name
            }
        })
        .then((R) => {   
            // 返回的信息         
            if(R === null) {
                return cb('用户名不正确1')
            }
            if(user_name !== R.dataValues.user_name) {
                return cb('用户名不正确')
            }
            if(user_pwd !== R.dataValues.user_pwd) {
                return cb('密码不正确')
            }
            cb(null, R)
        }, (err) => {
            cb(err, null)
        })
    }
    // 登陆失败
    handelLoginError(user_name, cb) {
        return User.findOne({
            where: {
                user_name: user_name
            }
        })
        .then((c) => {
            // 当用户名不正确时 c === null
            if(c === null) {
                return cb('用户名不正确')
            } else {
                var login_count = Number(c.dataValues.login_count) + 1
                if(login_count > 6) {
                    return cb('密码错误超过六次,请3个小时后再登陆')
                }
                return c.update({
                    login_count: login_count
                })
                .then((R) => {
                    console.log(R.dataValues.login_count);
                    cb(null, R)
                }, (err) => {
                    cb(err, null)
                })
            }
        }, (err) => {
            cb(err, null)
        })
    }
    
}

exports.Class = handelUser; // 用于封装方法

