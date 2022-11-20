const jwt = require('jsonwebtoken');

const AuthCheck = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization;
        const decode = jwt.verify(token, process.env.jwt_secret);
        const { username, userId } = decode;
        req.username = username;
        req.userId = userId;
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = AuthCheck;