import Router from 'koa-router'
import { getStock, isLogin, makePrefer, deletePrefer } from "../controller/user"

const router = Router()

router.use(isLogin);

router.get('/prefer', getStock)
.post('/prefer', makePrefer)
.delete('/prefer', deletePrefer);

export default router;