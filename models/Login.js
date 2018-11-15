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
    phone: {
        type: Sequelize.INTEGER,
        defaultValue: '1583000'  // 默认值
    },
    op: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    sale_volume: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // 每天的登录次数
    login_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    login_time: {
        type: Sequelize.STRING, // 登录时间
        defaultValue: 0,
        allowNull: true,  // 允许为空  
    }

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
                // 当输入错误密码6次时，记录一个时间戳，在一天之内不能登陆。
                var id = Number(c.dataValues.id);
                if(login_count > 6) {
                    this.handelLoginErrorAfterDay(id, cb)
                    return cb('密码错误超过六次,请24个小时后再登陆')
                        // return User.findById(id)
                        // .then((time) => {
                        //     if(time === null) {

                        //     }
                        // })
                    
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
    // 当登录6次失败后，更新登录时间
    handelLoginErrorAfterDay(id, cb) {
        return User.findOne({
            where: {
                id: id
            }
        })
        .then((time) => {
            if(time === null) {
                console.log('time is null')
            } else {
                return time.update({
                    login_time: login_time
                })
                .then((R) => {
                    cb(null, R)
                }, (err) => {
                    cb(err, null)
                })
            }
        })
    }
    // 注册
    handelRegist(user_name, user_pwd, phone, cb) {
        return User.findOne({
            where: {
                user_name
            }
        })
        .then((C) => {
            if(C === null) {
                // 用户名没有重复
                return User.create({
                    user_name: user_name,
                    user_pwd: user_pwd,
                    phone: phone
                })
                .then((R) => {
                    cb(null, R);
                }, (E) => {
                    cb(E, null)
                })
            }else {
                if(C.dataValues.user_name === user_name) {
                    // 用户名相同
                    return cb('抱歉，用户名已被占用');
                }
            }
        }, (E) => {
            return cb(E, null);
        })
    }
    // 修改密码
    handelChangePWD(user_name, new_user_pwd, cb) {
        return User.findOne({
            where: {
                user_name: user_name
            }
        })
        .then((C) => {
            if(C === null) {
                return cb('请您先登录再修改密码！')
            } else {
                return C.update({
                    user_pwd : new_user_pwd,
                })
                .then((R) => {
                    cb(null, R)
                }, (E) => {
                    cb(E, null)
                })
            }
        }, (E) => {
            cb(E, null)
        })
    }
    
}

exports.Class = handelUser; // 用于封装方法

