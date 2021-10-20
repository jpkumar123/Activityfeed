const jwt = require('jsonwebtoken');

const getToken = data => jwt.sign(data, process.env.JWT_SECRET);

const decodeToken = token => {
    console.log("token verify", jwt.verify(token, process.env.JWT_SECRET))
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    getToken, 
    decodeToken
}
