'use strict';

import express from 'express';
import {shop} from '../controller/shopping/shop'
import {food} from '../controller/shopping/food'
import { category} from '../controller/shopping/Category'
import {check} from '../middlewares/check'

const router = express.Router();

router.get('/restaurants', shop.getRestaurants);
router.get('/restaurants/count', shop.getShopCount);
router.get('/restaurant/:restaurant_id', shop.getRestaurantDetail);
router.get('/getcategory/:restaurant_id', food.getCategory);
router.get('/v2/menu', food.getMenu);
router.get('/v2/menu/:category_id', food.getMenuDetail);
router.get('/v2/foods', food.getFoods);
router.get('/v2/foods/count', food.getFoodsCount);
router.get('/v2/restaurant/category', category.getCategories);
router.get('/v1/restaurants/delivery_modes', category.getDelivery);
router.get('/v1/restaurants/activity_attributes', category.getActivity);


router.delete('/restaurant/:restaurant_id', check.checkSuperAdmin, shop.deleteResturant);
router.delete('/v2/food/:food_id', check.checkSuperAdmin, food.deleteFood);


//POST (多了一个中间件 中间件要和session有关了 post后面是一个 ... 数组 记得调用next就好了 )
router.post('/addshop', check.checkAdmin, shop.addShop); //POST 全部用form那个处理 (客户端 可以使用JSON )
router.post('/addcategory', check.checkAdmin, food.addCategory);
router.post('/addfood', check.checkAdmin, food.addFood);
router.post('/updateshop', check.checkAdmin, shop.updateshop);
router.post('/v2/updatefood', check.checkAdmin, food.updateFood);

export default router