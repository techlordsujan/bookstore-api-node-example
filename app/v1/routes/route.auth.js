const router = require('express').Router();
const authController = require('../controllers/controller.auth');

const validate = require('../middlewares/middlware.validate');
const loginSchema = require('../requests/request.login');
const registerSchema = require('../requests/request.register');
const bookController = require('../controllers/controller.book');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/book', bookController.index);


module.exports = router;