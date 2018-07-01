import Router  from 'koa-router'
import userrt from './user'
import stockrt from './stock'

const router = Router()

router.use('/users', userrt.routes());
router.use('/stock', stockrt.routes())

export default router