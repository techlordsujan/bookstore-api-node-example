const User = require('../models/model.user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const user = await User.create({...req.body, role: 'guest'});
        user.sendWelcomeEmail();
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({
            status: 'fail',
            message: 'Email and password are required'
        });

    try {
        const user = await User.findOne({email});

        if(!user)
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });

        const isValid = await user.verifyPassword(password)

        if(!isValid)
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password'
            });

        const payload = {
            sub: user._id,
            email: user.email,
            role: user.role,
            iat: Math.floor(Date.now() / 1000)
        }

        const access_token = await getAccessToken(payload);
        const refresh_token = await getRefreshToken(payload);
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                user,
                access_token,
                refresh_token
            }
        });
    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.refreshToken = async (req, res) => {
    const {refresh_token} = req.body;
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if(err)
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });

        const payload = {
            sub: decoded.sub,
            email: decoded.email,
            role: decoded.role,
            iat: Math.floor(Date.now() / 1000)
        }

        const access_token = await getAccessToken(payload);
        res.status(200).json({
            status: 'success',
            data: {
                access_token
            }
        });
    })
}

function getAccessToken(payload)
{
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '120m'}, (err, token) => {
            if(err) reject(err);
            resolve(token);
        });
    });
}

function getRefreshToken(payload)
{
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '10d'}, (err, token) => {
            if(err) reject(err);
            resolve(token);
        });
    });
}