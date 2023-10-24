const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./app/v1/config/config.db');
const fileUpload = require('express-fileupload');
const auth = require('./app/v1/middlewares/middleware.auth');
const isAdmin = require('./app/v1/middlewares/middleware.isAdmin');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cors());
// app.use(cors(
//     // {
//     //     origin: [
//     //         'http://localhost:3000',
//     //         'http://localhost:3001',
//     //     ],
//     //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     //     allowedHeaders: ['Content-Type', 'Authorization']
//     // }
// ));
app.use(fileUpload());
app.use(express.static('public'));

app.use('/api/v1/auth', require('./app/v1/routes/route.auth'));


app.use(auth);
app.use('/api/v1/cart', require('./app/v1/routes/route.cart'));

app.use(isAdmin)
app.use('/api/v1/books', require('./app/v1/routes/route.book'));
app.use('/api/v1/categories', require('./app/v1/routes/route.category'));
app.use('/api/v1/users', require('./app/v1/routes/route.user'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});