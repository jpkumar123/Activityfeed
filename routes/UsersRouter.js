const { isAuthorized, isAdmin} = require("../middlewares");
const { User } = require("../models/index");
const { compareContent, hashContent } = require("../utils/hash");
const { getToken } = require("../utils/jwt");
const { Roles } = require("../models/index");
const Router = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../models/user");
const { check, body } = require("express-validator");

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})

const authcontroller = require("../controllers/authcontroller.js");
const usercontroller = require("../controllers/usercontroller.js");
const { registerValidator } = require('../utils/validators');

/**
 * @swagger
 *   post:
 *     description: User registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email of the user to register.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password of the user to register
 *         in: formData
 *         required: true
 *         type: string
 *       - name: Username
 *         description: Username of the user to register
 *         in: formData
 *         required: true
 *         type: string
 *       - name: mobileno
 *         description: mobileno of the user to register
 *         in: formData
 *         required: true
 *         type: string
 *       - name: role
 *         description: Role of the user to register - value should be either user or admin.
 *         in: Headers
 *         required: true
 *         type: string
 *     tags:
 *       - Registration and Authentication
 *     responses:
 *       '200':
 *          description: Success response
 */

Router.post("/signup",
        registerValidator
    ,authcontroller.signup);

/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login(To get the JWT token)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email of the user to login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password for the user to set.
 *         in: formData
 *         required: true
 *         type: string
 *     tags:
 *       - Registration and Authentication
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.post("/login", authcontroller.login);
/**
 * @swagger
 *
 * /getuserposts:
 *   get:
 *     description: To get all user postslist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the user.
 *         in: header
 *         required: true
 *         type: string
 *     tags:
 *       - Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.get("/postslist", isAuthorized, authcontroller.getpostslist);

/**
 * @swagger
 *
 * /admin:
 *   get:
 *     description: To get all users list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the admin user.
 *         in: header
 *         required: true
 *         type: string
 *     tags:
 *       - Admin Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */

Router.get("/alluserslist", isAuthorized,isAdmin,authcontroller.getalluserslist);
/**
 * @swagger
 *
 * /allposts:
 *   get:
 *     description: To get all posts list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the user.
 *         in: header
 *         required: true
 *         type: string
 *     tags:
 *       - Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */

Router.get("/allpostslist", isAuthorized, authcontroller.getallpostslist);

/**
 * @swagger
 *
 * /pages:
 *   get:
 *     description: To get pages 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Page
 *         description: Page number.
 *         in: params
 *         required: true
 *         type: integer 
 *     tags:
 *       - Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.get("/page/:page", usercontroller.getpage);




module.exports = Router;
