
let express = require('express');
let path = require('path');
let fs = require('fs');

let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let app = express();


// CORS
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,x-access-token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true); //带cookies
    res.header("X-Powered-By",' 3.2.1');
    
    if(req.method === "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else  next();
});

// 中间件

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 通过passport，token解析服务
const jwt = require('jsonwebtoken');

// token校验中间件
app.use(function(req,res,next){
    // 获取token
    let token = req.header('x-access-token') || req.body.token || req.query.token;
    
    // jwt.verify(token,tokenSecret,(err,decoded)=>{
    //     if (err) {
    //         next();
    //     }else {
    //         req.currentUser = decoded;
    //         next();
    //     }
    // });

    // verify a token asymmetric
    // https://www.npmjs.com/package/jsonwebtoken
    var cert = fs.readFileSync('./DATA/token.pem');  // get public key
    jwt.verify(token, cert, function(err, decoded) {
        if(err) {
            next()
        } else {
            console.log(1,decoded,2)
            req.currentUser = decoded;
            next();
        }
    });
});

// 分发路由
let Router = require('./router');  // 把router.js所有的  入口导入
app.use('/',Router);





module.exports = app;
