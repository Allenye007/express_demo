
const Sequelize = require('sequelize');  // 引包
let sequelizeInstance = require('../config/configDB.js').sequelize;  // 引配置

// 定义模型
const User = sequelizeInstance.define('qr', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    uid: {
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    url: Sequelize.STRING,
    count: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
},{
    timestamps: false,
    freezeTableName: true,
});


// 同步数据库实例
sequelizeInstance.sync({force: false});


// 封装方法 通过promise返回
class handelUser {
    // 定义属性
    get uid() { return this._uid; }
    set uid(value) { this._uid = value; }

    get id() { return this._id; }
    set id(value) { this._id = value; }

    get url() { return this._url; }
    set url(value) { this._url = value; }

    get count() { return this._count; }
    set count(value) { this._count = value; }

    get status() { return this._status; }
    set status(value) { this._status = value; }

    // 获取用户列表
    getUserList(callback) {
        return User.findAll()
            .then((U) => {
                // console.log(U)
                callback(null, U);
            },(err) => {
                callback(err, null)
            })
    }
    // 根据用户名查出count 最多的一条数据
    getUid(uid,callback) {
        return User.findAll({
          where: {
            uid: uid,
          },
          limit: 1,
          order: [
              ['count', 'DESC']
          ]
        })
          .then((p) => {
            callback(null,p)
          }, (err) => {
            callback(err, null)
          })
    }
    // ------
    // 添加一个二维码
    creatQrCode(url, uid, cb) {
        let that = this;
        return User.create({
            uid: Number(uid),
            id: that.id,
            count: 0,
            url: url,
            status: 1,
        })
        .then((msg) => {
            cb(null, msg)
        }, (err) => {
            cb(err, null)
        })
    }

    // 删除一个二维码
    deleteQrCode(id, cb) {
        return User.destroy({
            where: {
                id: id,
            }
        })
        .then((res) => {
            cb(null, res)
        }, (err) => {
            cb(err, null)
        })
    }

    // 获取二维码列表
    getQrCodeList(uid, cb) {
        User.findAll({
            where: {
                uid: uid
            },
            order: [
                ['count', 'desc']  // asc升序
            ]
        })
        .then((res) => {
            cb(null, res)
        }, (err) => {
            cb(err, null)
        })
    }
    // 展示第一个二维码
    getShowFirsrQRCode(uid, cb) {
        return User.findOne({
            where: {
                uid: uid
            },
            order: [
                ['count', 'desc']
            ]
        })
        .then((res) => {
            cb(null, res)
        }, (err) => {
            cb(err, null)
        })
    }
    // 当用户扫描一次时，count + 1
    updataQrCodeCount(id, count, cb) {
        console.log(id, count, 11111);
        // 先找到id 所对应的数据
        User.findById(id)
        .then((c) => {
            if(c === null) {
                return cb({
                    msg: 'nooo'
                })
            } else {
                return c.update({
                    count: count,
                })
                .then((res) => {
                    cb(null, res)
                }, (err) => {
                    cb(err, null)
                })
            }
        })
    }

    // 考试
    getDaAn() {
        
    }
}
exports.Class = handelUser; // 用于封装方法