import Router  from 'koa-router'
import { getdetail } from '../controller/getStockDetail'
const router = Router()

router.get('/detail', async (ctx, next) => {
    const param = ctx.request.query;
    ctx.body = await getdetail(param["code"])
});

router.get('/search', async (ctx, next) => {
    await ctx.render('searchforStock', {
        title: 'Search!'
    })
});

export default router