import mysql from 'mysql';
import sqlconfig from '../config'
import { regExp_validate } from './validate';
import { passwdSha, compareSha } from './passwd-user';

export async function registerUser(username, email, password) {
    if (!regExp_validate.usernameReg.test(username) && !regExp_validate.lowpw.test(password) && !regExp_validate.email.test(email)) return false;
    const existed = await userexisted(email);
    if (!existed) return false;
    var connection = mysql.createConnection(sqlconfig); 
    const pwd = passwdSha(password);
    connection.connect();
    connection.query('insert into project.user value(?, ?, ?)', [username, email, pwd],  function (error, results, fields) {
        if (error) throw error;
    });
    connection.end();
    return true;
}

export async function userexisted(email) {
    var connection = mysql.createConnection(sqlconfig); 
    connection.connect();
    const res = await (new Promise((resolve, reject) =>{
	    connection.query('select * from project.user where email = ?' , [email], function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	    });
    }))
    console.log(res.length);
    connection.end();
    return res.length == 0;
}

export async function userlogin(email, passwd) {
    var connection = mysql.createConnection(sqlconfig);
    connection.connect();
    const [ res ] = await (new Promise((resolve, reject) =>{
	    connection.query('select * from project.user where email = ?' , [email], function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	    });
    }))
    connection.end();
    if (res && compareSha(passwd, res["password"])) return true;
    return false;
}

export async function StockofUser(email) {
    var connection = mysql.createConnection(sqlconfig);
    connection.connect();
    const res = await (new Promise((resolve, reject) =>{
	    connection.query('SELECT * FROM project.userandstock where email = ?' , [email], function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	    });
    }))
    connection.end();
    return res;
}
