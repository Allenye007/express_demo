
const Sequelize = require('sequelize');  // 引包
let sequelizeInstance = require('../config/configDB.js').sequelize;  // 引配置

// 设计表 扫表  并返回实例  
const User = sequelizeInstance.define('users', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});


// 同步数据库实例
User.sync({force: false});


// 封装方法 通过promise返回
class handelUser {
    // 定义属性
    get username() { return this._username; }
    set username(value) { this._username = value; }

    get birthday() { return this._birthday; }
    set birthday(value) { this._birthday = value; }

    // 获取用户列表
    getUserList(callback) {
        return User.findAll()
            .then((users) => {
                // console.log(users)
                callback(null, users);
            },(err) => {
                callback(err, null)
            })
    }
}
exports.Class = handelUser; // 用于封装方法