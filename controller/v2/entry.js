'use strict';

import EntryModel from '../../models/v2/entry'

class Entry {
    constructor() {
        
    }
    // 上方的东西
    async getEntry(req, res, next) {
        try {
            const entries = await EntryModel.find({}, '-_id'); // 前面的是显示啥 后面排除啥 少了 _id : 5a1fcca4534e134dbfb9f4dc 之类的东西
            res.send(entries);
        } catch (err) {
            console.log('获取数据失败');
            res.send({
                status: 0,
                type: 'ERROR_DATA',
                message: '获取数据失败'
            })
            return
        }
    }
}

export default new Entry()