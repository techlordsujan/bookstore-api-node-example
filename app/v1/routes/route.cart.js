const router = require('express').Router();
const cartController = require('../controllers/controller.cart');

router.get('/', cartController.index);
router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);

module.exports = router;