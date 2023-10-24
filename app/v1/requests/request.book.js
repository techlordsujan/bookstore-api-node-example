const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    category: Joi.string().required(),
    isbn: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required()
});

module.exports = bookSchema;