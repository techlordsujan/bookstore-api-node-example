const Cart = require('../models/model.cart');
const Book = require('../models/model.book');

exports.index = async (req, res) => {
    // get user id from request object
    const user = req.user.sub;

    try {
        // get cart for user
        let cart = await Cart.findOne({ user }).select("-user").populate('items.book');

        if(!cart)
            cart = await Cart.create({ user, items: [] });

        res.status(200).json({
            status: 'success',
            data: cart
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.addToCart = async (req, res) => {   
    // get book id from request body
    const { book: bookId } = req.body;

    // get user id from request object
    const user = req.user.sub;

    try {
        // check if cart exists for user
        let cart = await Cart.findOne({ user }).select("-user");

        if(!cart)
        {
            // create a new cart
            const newCart = await Cart.create({ user, items: [{ book: bookId, quantity: 1 }] });
            return res.status(201).json({
                status: 'success',
                data: newCart
            });
        }

        // check if book is already in the cart
        const book = cart.items.find(item => item.book == bookId);

        if(book)
        {
            // if book already in cart add 1 to quantity
            book.quantity += 1;
        }else{
            cart.items.push({ book: bookId, quantity: 1 });
        }

        await cart.save();

        // populate cart with book details
        cart = await Cart.findOne({ user }).select("-user").populate('items.book');

        res.status(200).json({
            status: 'success',
            data: cart
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.removeFromCart = async (req, res) => {
    const { book: bookId } = req.body;
    const user = req.user.sub;

    try {
        // check if cart exists for user
        let cart = await Cart.findOne({ user }).select("-user");

        if(!cart)
            return res.status(404).json({
                status: 'fail',
                message: 'Cart not found'
            });

        // check if book is already in the cart
        const book = cart.items.find(item => item.book == bookId);

        // if book not in cart return error
        if(!book)
            return res.status(404).json({
                status: 'fail',
                message: 'Book not found in cart'
            });

        // if book already in cart remove 1 to quantity
        book.quantity -= 1; 

        if(book.quantity == 0)
        {
            const index = cart.items.indexOf(book);
            cart.items.splice(index, 1);
        }

        await cart.save();

        // populate cart with book details
        cart = await Cart.findOne({ user }).select("-user").populate('items.book');

        res.status(200).json({
            status: 'success',
            data: cart
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}