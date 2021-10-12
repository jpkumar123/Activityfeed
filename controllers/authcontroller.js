//user can signup
const { User } = require('../models/index');
const { Roles } = require('../models/index');
const bcrypt = require('bcrypt');
const { compareContent, hashContent } = require('../utils/hash');
const { getToken } = require('../utils/jwt');
const {Post}= require('../models/index');

exports.signup =(req, res) => {
    const userData = {
        email: req.body.email,
        Username: req.body.Username,
        password: req.body.password,
        mobileno: req.body.mobileno,
        role_id: 1   
    };

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        res.json( {Username: req.body.Username, status: user.email + 'REGISTERED SUCCESSFULLY' })
                    })
                
                    .catch(err => {
                        res.send('ERROR: ' + err)
                    })
                })
            } else {
                res.json({ error: "USER ALREADY EXISTS" })
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
     
        if(user == null) throw new Error("email is not found");

        const doesPasswordMatch = await compareContent(password, user.password);

        if(doesPasswordMatch == false) throw new Error("password doesn't match");


        const jwtData = {
            id: user.id,
            email: user.email
        };

        const token = getToken(jwtData);

        user.password = undefined;
        res.send({
            user: user,
            token: token
        });



    }catch(err){
        return res.status(400).send({
            error: err.message
        })
    }

}


//user can get users list with id

exports.getuserslist=async (req, res) => {
    try{
        const userId = req.params.userId;

        const user = await User.findOne({
            where: {
                id: userId
            }
        });
    
        return res.send({
            user: user
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
        
        const posts = await Post.findAll();
        res.send({
            count : posts.length,
            posts: posts

        });
    
        

    }catch(err){
        return res.status(400).send({
            error: err.message
        })
    }
}

