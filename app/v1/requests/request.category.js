const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    status: Joi.string().valid('active', 'inactive').required(),
});

module.exports = categorySchema;