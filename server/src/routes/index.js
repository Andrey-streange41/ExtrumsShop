const Router = require('express');
const router = new Router();

const userRouter = require('./user.router');
const submenuRouter = require('./submenu.router');
const productRouter = require('./product.router');
const userInfoRouter = require('./userInfo.router');


router.use('/user', userRouter);
router.use('/submenu',submenuRouter);
router.use('/products',productRouter);
router.use('/userInfo',userInfoRouter);



 module.exports = router;