'use strict';

import express from 'express';
import { cities } from '../controller/v1/CityHandle'
import Entry from '../controller/v2/entry'
import {user} from '../controller/v2/user'
const router = express.Router();

router.get('/pois/:geohash', cities.pois);
router.get('/index_entry', Entry.getEntry);
router.post('/login', user.login); // 利用cookies
router.get('/signout', user.signout); // 退出直接删除 session
router.post('/changepassword', user.chanegPassword);


export default router