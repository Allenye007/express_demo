
const { redisConfig } = require('../config/config');
const Redis = require('ioredis');
const redisClient = new Redis(redisConfig.port,redisConfig.host);


const setRedis = (k, v, ex) => {
    if(typeof ex === 'number') {
        redisClient.set(k, v, ex)
    } else {
        redisClient.set(k, v);
    }
}

const getRedis = (k, cb)=> {
    redisClient.get(k, (err, data) => {
        cb(err, data);
    })
}


const handelSetRedis = (k, v, ex) => {
    setRedis(k, v, ex);
}

const handelGetRedis = (k, cb) => {
    getRedis(k, cb);
}


// ex:

// var k = (new Date()).valueOf();
// var t = '';
// setRedis(k, t, 60*60);

// getRedis(k, (err, data) => {
//     console.log(data, 000);
//     console.log(err, 1111);
// });

module.exports = {
    handelSetRedis,
    handelGetRedis
}

