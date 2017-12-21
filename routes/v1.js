'use strict';


import express from 'express'

/* 
Demo async function

async function getCity(req, res, next) {
    const type = req.query.type;
    try {
        console.log(req);
        res.send({
            name: 'ERROR_DATA',
            message: '获取数据失败',
        });
    } catch (err) {
        res.send({
            name: 'ERROR_DATA',
            message: '获取数据失败',
        });
    }
}

const router = express.Router();
router.get('/cities', getCity);
*/
// import最好是一个类 or 方法 import一个对象好似不太好 但是这样 外面就不太好用了
import {cities} from '../controller/v1/CityHandle'
import {search} from '../controller/v1/SearchPlace'


import {carts} from '../controller/v1/Carts'
import {address} from '../controller/v1/Address'
import {remark} from '../controller/v1/Remark'
import {captchas} from '../controller/v1/Captchas'
import {user} from '../controller/v2/User'
import {order} from '../controller/v1/Order'
import {hongbao} from '../controller/promotion/Hongbao'

// 基本工具
import { baseHandle } from '../prototype/BaseComponent'


const router = express.Router();

router.get('/cities', cities.getCity);
router.get('/cities/:id', cities.getCityById);
router.get('/exactaddress', cities.getExactAddress);
router.get('/pois', search.search);

// 这个做得是假数据 cart_id没用上
router.get('/carts/:cart_id/remarks', remark.getRemarks);

router.get('/users/:user_id/addresses', address.getAddress);
router.delete('/users/:user_id/addresses/:address_id', address.deleteAddress);

// session中的ID
router.get('/user', user.getInfo);

router.get('/user/:user_id', user.getInfoById);
router.get('/user/city/count', user.getUserCity);
router.get('/users/list', user.getUserList);
router.get('/users/count', user.getUserCount);
router.get('/addresse/:address_id', address.getAddAddressById);

// POST
router.post('/addimg/:type', baseHandle.uploadImg); //上传图片
router.post('/carts/checkout', carts.checkout);

router.post('/users/:user_id/addresses', address.addAddress);
router.post('/users/:user_id/carts/:cart_id/orders', order.postOrder);

// 获取验证码
router.post('/captchas', captchas.getCaptchas);

// 红包(这里简单处理了一下而已)
router.post('/users/:user_id/hongbao/exchange', hongbao.exchange);

export default router