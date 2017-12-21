'use strict';

import express from 'express';
import { explain} from '../controller/v3/Explain'
const router = express.Router();

router.get('/profile/explain', explain.getExpalin)

export default router