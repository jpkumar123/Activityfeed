const Router = require('express').Router();

const userRouter = require("./UsersRouter");
const postRouter = require('./PostRouter');
const { isAuthorized, isAdmin } = require('../middlewares');
const {Post}= require('../models/index');
const {User}= require('../models/index');




Router.use(userRouter);
Router.use(isAuthorized,postRouter);






module.exports = Router;