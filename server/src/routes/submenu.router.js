const Router = require('express');
const router = new Router();
const SubmenuController = require('../controllers/submenu.controller')


router.get('/',SubmenuController.takeAllItems);
router.post('/',SubmenuController.addNewItem);

module.exports = router;


 