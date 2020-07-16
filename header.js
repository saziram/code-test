module.exports.headers = (req, res, next) => {
    // Allow website to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    // Allowed request method
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('accept', 'application/json');
    next();
};