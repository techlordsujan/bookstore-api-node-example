const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Cart must belong to a user'],
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: [true, 'Cart must have a book'],
            },
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'Quantity must be greater than or equal to 1'],
            }
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);