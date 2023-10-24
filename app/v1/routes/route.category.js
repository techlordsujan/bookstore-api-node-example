const router = require('express').Router();

const categoryController = require('../controllers/controller.category');
const validate = require('../middlewares/middlware.validate');
const categorySchema = require('../requests/request.category');

router.get('/', categoryController.index);
router.post('/', validate(categorySchema), categoryController.store);
router.get('/:id', categoryController.show);
router.delete('/:id', categoryController.destroy);
router.put('/:id', validate(categorySchema), categoryController.update);

module.exports = router;