'use strict';


import AddressComponent from '../../prototype/AddressComponent'
import Cities from '../../models/v1/cities'
import { cities } from './CityHandle'

export default class SearchPlace extends AddressComponent {
    constructor() {
        super()
        this.search = this.search.bind(this)
    }
    async search(req, res, next) {
        let { type = 'search', city_id, keyword } = req.query;
        if (!keyword) {
            res.send({
                name: 'ERROR_QUERY_TYPE',
                message: '参数错误',
            })
            return
        } else if (isNaN(city_id)) { // city_id 也不是必须的啦 (会试着去定位)
            try {
                const cityname = await cities.getCityName(req);
                const cityInfo = await Cities.cityGuess(cityname);
                city_id = cityInfo.id;
            } catch (err) {
                console.log('搜索地址时，获取定位城失败')
                res.send({
                    name: 'ERROR_GET_POSITION',
                    message: '获取数据失败',
                })
            }
        }
        try {
            const cityInfo = await Cities.getCityById(city_id);
            const resObj = await this.searchPlace(keyword, cityInfo.name, type);
            const cityList = [];
            resObj.data.forEach((item, index) => {
                cityList.push({
                    name: item.title,
                    address: item.address,
                    latitude: item.location.lat,
                    longitude: item.location.lng,
                    geohash: item.location.lat + ',' + item.location.lng,
                })
            });
            res.send(cityList);
        } catch (err) {
            res.send({
                name: 'GET_ADDRESS_ERROR',
                message: '获取地址信息失败',
            });
        }
    }
}
const search = new SearchPlace();
export {search};