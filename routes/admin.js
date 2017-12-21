'use strict';

import express from 'express'
import {admin} from '../controller/admin/Admin'
const router = express.Router()

router.post('/login', admin.login);
router.post('/register', admin.register);
router.get('/singout', admin.singout);
router.get('/all', admin.getAllAdmin);
router.get('/count', admin.getAdminCount);
router.get('/info', admin.getAdminInfo);
router.post('/update/avatar/:admin_id', admin.updateAvatar);

export default router