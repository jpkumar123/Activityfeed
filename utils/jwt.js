const jwt = require('jsonwebtoken');

const getToken = data => jwt.sign(data, process.env.JWT_SECRET);

const decodeToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    getToken, 
    decodeToken
}
