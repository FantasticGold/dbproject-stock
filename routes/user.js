import Router from 'koa-router'
import { getStock, isLogin, makePrefer, deletePrefer } from "../controller/user"

const router = Router()

router.get('/prefer', getStock)
.post('/prefer', makePrefer)
.delete('/prefer', deletePrefer)
.post('/isLogin', isLogin)

export default router;