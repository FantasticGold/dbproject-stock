import Router from 'koa-router'
import { getStock, isLogin, makePrefer, deletePrefer } from "../controller/user"

const router = Router()

router.get('/get', async (ctx, next) => {
    const { email : email } = ctx.request.query;
    ctx.body = await getStock(email)
});

router.post('/add', makePrefer)

router.get('/prefer', getStock)
.post('/prefer', makePrefer)
.delete('/prefer', deletePrefer)
.post('/isLogin', isLogin)

export default router;