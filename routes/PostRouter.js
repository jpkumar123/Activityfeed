const { isAuthorized } = require('../middlewares');
const { Post }= require('../models/index');

const Router = require('express').Router();
const usercontroller = require("../controllers/usercontroller.js");

// create post
Router.post("/addpost", usercontroller.addpost)
//update post
Router.put("/updatepost/:postId", usercontroller.updatepost)


// delete post
Router.delete("/deletepost/:postId",usercontroller.deletepost)

//get userspostslist and posts with postid
Router.get("/userposts/:postId",isAuthorized,usercontroller.getuserpostslist)





module.exports = Router;
