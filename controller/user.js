import mysql from 'mysql';
import sqlconfig from '../config'
import { regExp_validate } from './validate';
import { passwdSha, compareSha } from './passwd-user';
import bluebird from "bluebird"

export async function registerUser(ctx, next) {
    const { username : username, email : email, passwd : passwd} = ctx.request.body;
    if (!regExp_validate.usernameReg.test(username) && !regExp_validate.lowpw.test(passwd) && !regExp_validate.email.test(email)) return false;
    const existed = await userexisted(email);
    if (!existed) return false;
    var connection = mysql.createConnection(sqlconfig); 
    const pwd = passwdSha(passwd);
    connection.connect();
    return await new Promise((resolve, reject)=>{
        connection.query('insert into project.user value(?, ?, ?)', [username, email, pwd],  function (error, results, fields) {
            if (error) { 
                ctx.body = {
                    msg : error,
                    status: false,
                };
                reject(error);
            }
            connection.end();
            ctx.body = {
                status: true
            };
            resolve();
        });
    });
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

export async function userlogin(ctx, next) {
    const { email : email, passwd : passwd} = ctx.request.body;
    var connection = mysql.createConnection(sqlconfig);
    connection.connect();
    const [ res ] = await (new Promise((resolve, reject) =>{
	    connection.query('select * from project.user where email = ?' , [email], function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	    });
    }))
    connection.end();
    if (res && compareSha(passwd, res["password"])) {
        
    };
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
