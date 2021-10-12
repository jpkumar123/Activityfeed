const { decodeToken } = require("../utils/jwt");
const { User } = require("../models/index");
const isAuthorized = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const user = decodeToken(token);

        req.user = user;
        next();

    }catch(error){
        res.status(401).end("Invaliduser");
    }
}

const isAdmin = async (req, res, next) => {
    try{
        const currentUser = req.user;
        const user = await User.findOne({
            where: {
                id: currentUser.id
            }
        });

        if (user.role_id === 1) {
            next();
          } else {
            throw new Error("you are not a admin");
          }

    }catch(err){
        res.status(401).end(err.message);
    }
}


module.exports = {
    isAuthorized,
    isAdmin
}

