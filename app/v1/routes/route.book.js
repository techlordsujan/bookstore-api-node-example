const router = require('express').Router();

const bookController = require('../controllers/controller.book');
const validate = require('../middlewares/middlware.validate');
const bookSchema = require('../requests/request.book');

router.get('/', bookController.index);
router.post('/', bookController.store);
router.get('/:id', bookController.show);
router.delete('/:id', bookController.destroy);
router.put('/:id', bookController.update);

module.exports = router;

// req.body => normal text-data
// req.files => file-data

// (req, res, next) => {
//     validate(bookSchema), (req, res, next) => {
//         const file = req.files?.image;
    
//         if(!file) {
//             // return
//         }
    
//         if(['pdf', 'docx'].includes(file.name.split('.').pop()))
//         {
//             // return
//         }
    
//         next();
    
//     }
// }