let db = require('../config/configDB.js');
console.log(db);
db.connect();
 
var  addSql = 'INSERT INTO allen(user, password) VALUES(0,?,?,?,?)';
var  addSqlParams = ['allen', '123'];
//增
db.INSERT(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
db.end();