//user can signup
const { User } = require('../models/index');
const { Roles } = require('../models/index');
const bcrypt = require('bcrypt');
const { compareContent, hashContent } = require('../utils/hash');
const { getToken } = require('../utils/jwt');
const {Post}= require('../models/index');
const models = require("../models/index");
const { Like } = require("../models/index");
const { check, body } = require("express-validator");
const { registerValidator } = require('../utils/validators');
const { validationResult } = require("express-validator");

// const User = require('../models/user');
const Sequelize = require('sequelize');
exports.signup =(req, res) => {
    const userData = {
        email: req.body.email,
        Username: req.body.Username,
        password: req.body.password,
        mobileno: req.body.mobileno,
        role_id: 2
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json( {
       
        ErrorMessage: errors.array()[0].msg,
       
        // validationErrors: errors.array()
      });
    }

    User.findOne({
        where: {
            email: req.body.email
        },
        
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        res.json( {Username: req.body.Username, status:   'User Registered successfully.' })
                    })
                
                    .catch(err => {
                        res.send('ERROR: ' + err)
                    })
                })
            } else {
                res.status(400).end( "Email already exist!" )
                
            }
        })
        .catch(err => {
            res.send('ERROR: ' + err)
        })
}
//user can login
exports.login =async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {email}, 
             include: [
                {
                  model: Roles,
                  as: "Role", 
                },  
              ],
        });
        if(user == null) throw new Error("Email is not found");
        const doesPasswordMatch = await compareContent(password, user.password);
        if(doesPasswordMatch == false) throw new Error("Invalid Credentials");
        const jwtData = {
            id: user.id,
            email: user.email,
        };
        const token = getToken(jwtData);
        user.password = undefined;
        res.send({
            user: user,
            token: token,
        });
    }catch(err){
        return res.status(400).send({
            Error: err.message
        })
    }
}


//user can get posts list with id
exports.getpostslist=async (req, res) => {
    try{
        const user_id = req.body;

        const posts = await User.findOne({
            where: {
                id: user_id
            }
        });
    
        return res.send({
            posts: posts
        });

    }catch(err){
        return res.status(400).send({
            error: err.message
        })
    }

}

//admin to get alluserslist


exports.getalluserslist=async (req, res) => {
    try{
        
        const users = await User.findAll();
        res.send({
          data:users,

        });
    
        

    }catch(err){
        return res.status(400).send({
            error: err.message
        })
    }
}


exports.getallpostslist=async (req, res) => {
    try{
        
        let posts = await Post.findAll({ 
            include:[{
                model: models.Comment,
                as: "Comments"
            },{
                model: models.Like,
                as: "Like",
            },
           ],
        });

        posts = posts.map(_post=> {
            const obj = _post.get({ plain: true });
            obj.likesCount = obj.Like.length;
            return obj;
        });


        res.send(
            {
            count : posts.length,
            posts: posts,
           }
        );
    
        

    }catch(err){
        return res.status(400).send({
            error: err.message
        })
    }
}

