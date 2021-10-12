const { isAuthorized,isAdmin } = require('../middlewares');
const { User } = require('../models/index');
const { compareContent, hashContent } = require('../utils/hash');
const { getToken } = require('../utils/jwt');
const { Roles } = require('../models/index');
const Router = require('express').Router();
const bcrypt = require('bcrypt');
const user = require('../models/user');
const {sgMail} = require('@sendgrid/mail');
require('dotenv').config();

const authcontroller = require("../controllers/authcontroller.js");
const usercontroller = require("../controllers/usercontroller.js")
Router.post('/signup',authcontroller.signup
)
  

Router.post("/login", authcontroller.login)



//user can get users list using userid
Router.get("/user/:userId", isAuthorized, authcontroller.getuserslist);


Router.get("/userslist", isAuthorized,isAdmin, authcontroller.getalluserslist);


Router.get("/userpostslist", isAuthorized,isAdmin, authcontroller.getallpostslist);

Router.post("/forgotpassword", usercontroller.postforgotPassword);
Router.post("/resetpassword", usercontroller.postresetPassword);

module.exports = Router;