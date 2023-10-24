const router = require('express').Router();
const userController = require('../controllers/controller.user');

const isAdmin = require('../middlewares/middleware.isAdmin');

router.get('/', userController.index);
router.post('/', isAdmin, userController.store);

router.get('/admin', userController.getAdmin);
router.get('/guest', userController.getGuest);

router.delete('/:id', userController.destroy);

module.exports = router;