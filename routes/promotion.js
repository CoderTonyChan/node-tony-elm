'use strict';

import express from 'express';
import { hongbao } from '../controller/promotion/Hongbao'
const router = express.Router();

router.get('/v2/users/:user_id/hongbaos', hongbao.getHongbao)
router.get('/v2/users/:user_id/expired_hongbaos', hongbao.getExpiredHongbao)

export default router