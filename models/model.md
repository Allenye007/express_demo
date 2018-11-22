#  Sequelize 和 MySQL 对照

#### 1.链接数据库

###### Sequelize

```
为了让Sequelize与MySQL一起很好地工作，你需要安装mysql2@^1.0.0-rc.10或更高版本。一旦完成，您可以像这样使用它：
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql'
})

$ npm install --save sequelize
$ npm install --save mysql2


// 引包
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.dbName, config.user, config.pwd, {
    // host: 'localhost',
    host: host,
    dialect: config.dialect,
    pool: {
      max: config.max,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
});

sequelize
  .authenticate()
  .then(()=>{
      console.log('App启动，数据库连接成功');
  })
  .catch(err => {
      console.log(err);
  });
  
  // 导出
exports.sequelize = sequelize;

```



###### MySQL

```
...
```



#### 2.定义单张表（模型定义）

###### Sequelize

```
// 要定义模型和表之间的映射，请使用该define方法。

// 定义字段名
const LianJia = sequelizeInstance.define(
	'lianJiaDB', // 表名
	// 字段名
	{
    // 定义字段
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        AUTO_INCREMENT: true
    },
    // 名字
    name: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    deadline: Sequelize.DATE,
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    paranoid: true,// 假删除，deletedAt 属性
    charset: 'utf8',
    
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    'timestamps': true,
    // 不需要createdAt字段
    'createdAt': false,
    // 将updatedAt字段改个名
    'updatedAt': 'utime'
    collate: 'utf8_general_ci'
})
```

###### MSQL

```
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment , 
    `emp_id` CHAR(10) NOT NULL UNIQUE, 
    `nick` CHAR(10) NOT NULL, 
    `department` VARCHAR(64),
    `created_at` DATETIME NOT NULL, 
    `updated_at` DATETIME NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

#### 3.单表增删改查

##### 增

###### Sequelize

```
// creat
User.create({
        user_name: user_name,
        user_pwd: user_pwd,
        phone: phone
    })
    .then((R) => {
        cb(null, R);
    }, (E) => {
        cb(E, null)
    })
```



###### MSQL

```
INSERT INTO `users` 
(`id`, `emp_id`, `nick`, `department`, `updated_at`, `created_at`) 
VALUES 
(DEFAULT, '1', '小红', '技术部', '2015-11-02 14:49:54', '2015-11-02 14:49:54');
```

##### 删

###### Sequelize

```
// destroy
User.destroy({
            where: {
                id: id,
            }
        })
        .then((res) => {
            cb(null, res)
        }, (err) => {
            cb(err, null)
        })
```

###### MSQL

```
DELETE FROM `users` WHERE `id` = 1;
```



##### 改

###### Sequelize

```
// update
c.update({
        count: count,
    })
    .then((res) => {
        cb(null, res)
    }, (err) => {
        cb(err, null)
    })
```

###### MSQL

```
UPDATE `users` 
SET `nick` = '小白白', `updated_at` = '2015-11-02 15:00:04' 
WHERE `id` = 1;
```



##### 查

###### Sequelize

```
// 查找全部
User.findAll()
            .then((U) => {
                // console.log(U)
                callback(null, U);
            },(err) => {
                callback(err, null)
            })
// 限制条件查询
User.findAll({
     where: {
       uid: uid,
     },
     'attributes': ['emp_id', 'nick']
});

// 通过ID查
User.findById(1).then(user => {
  return user.increment('my-integer-field', {by: 2})
}).then(user => {
 
})
// ★通过ID查，并更改。
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

```

###### MSQL

```
SELECT * FROM `users`;
SELECT `emp_id`, `nick` FROM `users`;
SELECT `id`, `emp_id`, `nick`, `department`, `created_at`, `updated_at` FROM `users`;
```



#### 4.批量工作 （一次创建，更新和销毁多行）

###### Sequelize

```
// 一次性创建  插入数据库

User.bulkCreate([
  { username: 'barfooz', isAdmin: true },
  { username: 'foo', isAdmin: true },
  { username: 'bar', isAdmin: false }
]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
  return User.findAll();
}).then(users => {
  console.log(users) // ... in order to get the array of user objects
})


// 要一次更新多个行

Task.bulkCreate([
  {subject: 'programming', status: 'executing'},
  {subject: 'reading', status: 'executing'},
  {subject: 'programming', status: 'finished'}
]).then(() => {
  return Task.update(
    { status: 'inactive' }, /* set attributes' value */
    { where: { subject: 'programming' }} /* where criteria */
  );
}).spread((affectedCount, affectedRows) => {
  // .update returns two values in an array, therefore we use .spread
  // Notice that affectedRows will only be defined in dialects which support returning: true

  // affectedCount will be 2
  return Task.findAll();
}).then(tasks => {
  console.log(tasks) // the 'programming' tasks will both have a status of 'inactive'
})



// 删除多行

Task.bulkCreate([
  {subject: 'programming', status: 'executing'},
  {subject: 'reading', status: 'executing'},
  {subject: 'programming', status: 'finished'}
]).then(() => {
  return Task.destroy({
    where: {
      subject: 'programming'
    },
    truncate: true /* this will ignore where and truncate the table instead */
  });
}).then(affectedRows => {
  // affectedRows will be 2
  return Task.findAll();
}).then(tasks => {
  console.log(tasks) // no programming, just reading :(
})

```

###### MSQL

```
...
```

#### 5.字段重命名

###### Sequelize

```
User.findAll({
    'attributes': [
        'emp_id', ['nick', 'user_nick']
    ]
});
```

###### MSQL

```

```

#### 6.where子句

###### Sequelize

```
User.findAll({
    'where': {
        'id': [1, 2, 3],
        'nick': 'a',
        'department': null，
     	title:[Op.like]:'%' +title + '%'}
    }
});
```

###### MSQL

```
SELECT `id`, `emp_id`, `nick`, `department`, `created_at`, `updated_at` 
FROM `users` AS `user` 
WHERE 
    `user`.`id` IN (1, 2, 3) AND 
    `user`.`nick`='a' AND 
    `user`.`department` IS NULL;
```

#### 7.ORM （关系）http://docs.sequelizejs.com/manual/tutorial/associations.html

关系一般有三种：一对一、一对多、多对多。`Sequelize`提供了清晰易用的接口来定义关系、进行表间的操作。

##### 1对1

###### Sequelize

```
const Player = this.sequelize.define('player', {/* attributes */});
const Team  = this.sequelize.define('team', {/* attributes */});

Player.belongsTo(Team); 
一个球员一个被部分团队与玩家的外键
BelongsTo关联是源模型上存在一对一关系的外键的关联。





HasOne关联是目标模型上存在一对一关系的外键的关联。
const User = sequelize.define('user', {/* ... */})
const Project = sequelize.define('project', {/* ... */})

// One-way associations
Project.hasOne(User)

Project.hasOne(User, { foreignKey: 'initiator_id' })


HasOne和BelongsTo之间的区别
```

###### MSQL

```
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment , 
    `emp_id` CHAR(10) NOT NULL UNIQUE, 
    `created_at` DATETIME NOT NULL, 
    `updated_at` DATETIME NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `notes` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` CHAR(64) NOT NULL, 
    `created_at` DATETIME NOT NULL, 
    `updated_at` DATETIME NOT NULL, 
    `user_id` INTEGER, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;
```



##### 1对多

###### Sequelize

```

```

###### MSQL

```

```



##### 多对多

###### Sequelize

```

```

###### MSQL

```

```



###### 

###### Sequelize分页

```
findAndCountAll({
            where:'',//为空，获取全部，也可以自己添加条件
            offset:(page - 1) * pageSize, // 开始的数据索引，比如当page=2 时offset=10 ，而												 pagesize我们定义为10，则现在为索引为10，也就是
            								 从第11条开始返回数据条目
            limit:pageSize//每页限制返回的数据条数
        })
        .then(R => {
            
        })
        .catch(E => {
            
        })
```

###### Sequelize模糊查询

```
var Op = require('sequelize').Op;

kaoshi.findAll({
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
```

