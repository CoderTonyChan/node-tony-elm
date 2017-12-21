'use strict';

import AdminModel from '../models/admin/admin'

export default class Check {
    constructor() {

    }
    // 检查 session
    async checkAdmin(req, res, next) {

        console.log('要求session' + req.session);
        console.log(req.session); 
        // Promise会默认吃掉
        
        if (!req.session || !req.session.admin_id || !Number(req.session.admin_id)) {
            res.send({
                status: 0,
                type: 'ERROR_SESSION',
                message: '亲，您还没有登录',
            })
            return
        } else {
            const admin = await AdminModel.findOne({ id: req.session.admin_id });
            if (!admin) {
                res.send({
                    status: 0,
                    type: 'HAS_NO_ACCESS',
                    message: '权限不足，请联系管理员提升权限',
                })
                return
            }
        }
        next()
    }
    async checkSuperAdmin(req, res, next) {
        const admin_id = req.session.admin_id;
        if (!admin_id || !Number(admin_id)) {
            res.send({
                status: 0,
                type: 'ERROR_SESSION',
                message: '亲，您还没有登录',
            })
            return
        } else {
            const admin = await AdminModel.findOne({ id: admin_id });
            if (!admin || admin.status != 2) {
                res.send({
                    status: 0,
                    type: 'HAS_NO_ACCESS',
                    message: '权限不足',
                })
                return
            }
        }
        next()
    }
}
const check = new Check();
export {check} 