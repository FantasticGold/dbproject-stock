import DBquery from './sqlquery'

export async function isLogin(ctx, next){
    console.log(`islogin`)
    if (!ctx.session.user) {
        ctx.body = {
            msg: '未登录状态',
            state: false
        }
    } else {
        ctx.body = {
            msg: ctx.session.user.email,
            user: ctx.session.user,
            state: true
        }
        console.log(ctx.session.user)
    }
    console.log(`state = ${ctx.body.state}`)
}

export async function getStock(email) {
    console.log(`getemail: ${email}`)
    const sql = `SELECT * FROM project.userandstock where email = ?`;
    const arg = [email];
    return await DBquery(sql, arg);
}

export async function makePrefer(ctx, next) {
    const { code } = ctx.request.body;
    const email = ctx.session.user.email
    console.log(`code = ${code}, email = ${email}`)
    // judge
    const exist = await PreferExist(email, code);
    const code_exist = await codeExist(code);
    if (exist) {
        ctx.body = {
            msg: "已添加自选股",
            state: false
        }
        return false;  
    }
    if (!code_exist) {
        ctx.body = {
            msg: "自选股不存在",
            state: false
        }
        return false;  
    }
    const sql = `insert into project.userandstock value(?, ?)`;
    const arg = [email, code];
    await DBquery(sql, arg);
    ctx.body = {
        msg: "Succuss add",
        state: true
    }
    return true;
}

export async function PreferExist(email, code) {
    const sql = `select * from project.userandstock where email = ? and code = ?`;
    const arg = [email, code];
    const res = await DBquery(sql, arg);
    return res.length != 0;
}

export async function codeExist(code) {
    const sql = `SELECT * FROM project.stock_data where code = ?`;
    const arg = [code];
    const res = await DBquery(sql, arg);
    return res.length != 0;
}

export async function deletePrefer(ctx, next) {
    const { code } = ctx.request.body
    // const { code } = ctx.request.query;
    const { email } = ctx.state.user;
    const sql = `DELETE FROM project.userandstock WHERE email = ? and code = ?`;
    const arg = [email, code];
    return await DBquery(sql, arg);
}