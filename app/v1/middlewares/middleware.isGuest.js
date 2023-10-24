module.exports = (req, res, next) => {
    if (req.user?.role !== 'guest') {
        return res.status(403).json({
            status: 'error',
            message: 'Access denied',
        });
    }
    next();
}