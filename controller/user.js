import { regExp_validate } from './validate'
import { passwdSha } from './passwd-user'

export function registerUser(username, email, password) {
    if (!regExp_validate.usernameReg.test(username) && !regExp_validate.lowpw.test(password) && !regExp_validate.email.test(email)) return false;
    var connection = mysql.createConnection(sqlconfig); 
    const pwd = passwdSha(password);
    connection.connect();
    connection.query('insert into project.user value(?, ?, ?)', [username, email, pwd],  function (error, results, fields) {
        if (error) throw error;
    });
    connection.end();
}

export function userexisted(email) {
    var connection = mysql.createConnection(sqlconfig); 
    connection.connect();

    const [ res ] = await (new Promise((resolve,reject) =>{
	    connection.query('select * from project.user where email = ?' , [email], function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	    });
    }))
    connection.end();
    return !!res;
}