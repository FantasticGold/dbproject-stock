import mysql from 'mysql';
import sqlconfig from '../config'
import { regExp_validate } from './validate';
import { passwdSha, compareSha } from './passwd-user';
import bluebird from "bluebird"

export async function registerUser(ctx, next) {
    const { username : username, email : email, passwd : passwd} = ctx.request.body;
    if (!regExp_validate.usernameReg.test(username) || !regExp_validate.lowpw.test(passwd) || !regExp_validate.email.test(email)) {
        ctx.body = {
            msg: '输入信息有误',
            status: false
        }
        return false;
    }
    const existed = await userexisted(email);
    if (!existed) {
        ctx.body = {
            msg: '该用户邮件已被注册',
            status: false
        }
        return false;
    }
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
    // console.log(res.length);
    connection.end();
    return res.length == 0;
}

export async function userlogin(ctx, next) {
    if (ctx.session.user) {
        ctx.body = {
            msg : 'already logined',
            state: false
        }
        return;
    }
    const { email, passwd } = ctx.request.body;
    var connection = mysql.createConnection(sqlconfig);
    connection.connect();
    const [ res ] = await new Promise((resolve, reject) =>{
	    connection.query('select * from project.user where email = ?' , [email], function (error, results, fields) {
	        if (error) throw error;
	        resolve(results);
	    });
    })
    connection.end();
    console.log(res);
    if (res && compareSha(passwd, res["password"])) {
        ctx.session.user = {
            username: res["name"],
            email: email,
        };
        ctx.body = {
            msg: "success login",
            status: true
        };
    }else {
        ctx.body = {
            msg: "username or password wrong",
            status: false
        };
    }
}

export async function logout(ctx, next) {
    ctx.session = null;
    ctx.body = {
        msg: "success logout",
        status: true
    }
}

