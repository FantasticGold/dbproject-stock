import DBquery from './sqlquery'

export async function isLogin(ctx, next){
    if (!ctx.session.user) {
        ctx.body = {
            msg: '未登录状态',
            state: false
        }
        return;
    }
    ctx.state.user = ctx.session.user;
    return next();
}

export async function StockofUser(email) {
    const sql = `SELECT * FROM project.userandstock where email = ?`;
    const arg = [email];
    return await DBquery(sql, arg);
}

export async function makePrefer(ctx, next) {
    const { code } = ctx.request.body;
    const { email } = ctx.state.user;
    // judge
    const exist = await PreferExist(email, code);
    const code_exist = await codeExist(code);
    if (exist) {
        ctx.body = {
            msg: "prefer existed",
            state: false
        }
        return false;  
    }
    if (!code_exist) {
        ctx.body = {
            msg: "Not existed",
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