const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/product.controller');
const checkRoleMiddleware = require('../middlewares/checkRole.middleware');


router.get('/',ProductController.takeAllProducts);
router.get('/:id',ProductController.takeById);
router.post('/',checkRoleMiddleware('ADMIN'), ProductController.addProduct);

module.exports = router;


 