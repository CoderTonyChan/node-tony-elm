'use strict';

import BaseComponent from '../../prototype/BaseComponent'
import RemarkModel from '../../models/v1/remark'

export default class Remark extends BaseComponent {
    constructor() {
        super()
    }
    async getRemarks(req, res, next) {
        const cart_id = req.params.cart_id;
        if (!cart_id || !Number(cart_id)) {
            res.send({
                status: 0,
                type: 'ERROR_PARAMS',
                message: '购物车ID参数错误'
            })
            return
        }
        try {
            const remarks = await RemarkModel.findOne({}, '-_id');
            res.send(remarks);
        } catch (err) {
            console.log('获取备注数据失败', err);
            res.send({
                status: 0,
                type: 'ERROR_GET_DATA',
                message: '获取备注数据失败'
            })
        }
    }
}
const remark = new Remark()
export {remark} 