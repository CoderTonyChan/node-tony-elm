'use strict'

import express from 'express'
import { statis} from '../controller/statis/statis'

const router = express.Router()

router.get('/api/:date/count', statis.apiCount)
router.get('/api/count', statis.apiAllCount)
router.get('/api/all', statis.allApiRecord)
router.get('/user/:date/count', statis.userCount)
router.get('/order/:date/count', statis.orderCount)
router.get('/admin/:date/count', statis.adminCount)

export default router