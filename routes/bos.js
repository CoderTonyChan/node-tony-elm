'use strict';

import express from 'express';
import {order} from '../controller/v1/order'
const router = express.Router();

router.get('/v2/users/:user_id/orders', order.getOrders)
router.get('/v1/users/:user_id/orders/:order_id/snapshot', order.getDetail)
router.get('/orders', order.getAllOrders)
router.get('/orders/count', order.getOrdersCount)

export default router