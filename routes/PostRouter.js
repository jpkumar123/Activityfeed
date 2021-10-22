const { isAuthorized,isAdmin } = require('../middlewares');
const { Post }= require('../models/index');
const multer  = require('multer')
const Router = require('express').Router();
const usercontroller = require("../controllers/usercontroller.js");

// create post
/**
 * @swagger
 *
 * /Addpost:
 *   post:
 *     description: To add post by user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Title of the post.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: content of the post.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.post("/addpost",usercontroller.addpost)
/**
 * @swagger
 *
 * /Updatepost:
 *   post:
 *     description: To update a post by user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Title of the post.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: content of the post.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: PostId
 *         description: Post Id of the needed post
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *          description: Success response
 */

Router.put("/updatepost/:postId", usercontroller.updatepost)
/**
 * @swagger
 *
 * /Deletepost:
 *   post:
 *     description: To delete a post by user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: PostId
 *         description: Post Id of the needed post which is to be deleted
 *         in: params
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *          description: Success response
 */


Router.delete("/deletepost/:postId",usercontroller.deletepost)
/**
 * @swagger
 *
 * /get user postslist:
 *   get:
 *     description: To get  user postslist
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
Router.get("/userpostslist",isAuthorized,usercontroller.getuserpostslist)
/**
 * @swagger
 *
 * /Add comment to posts:
 *   post:
 *     description: To add comment to postslist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the user.
 *         in: header
 *         required: true
 *         type: string
 *       - name: comment
 *         description: adding comment to the post
 *         in: formdata
 *         required: true
 *         type: string
 *       - name: postid
 *         description: postid which is needed to be commented
 *         in: params
 *         required: true
 *         type: integer
 *     tags:
 *       - Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.post("/addcomment/:postId",isAuthorized,usercontroller.addcomment)
/**
 * @swagger
 *
 * /Add like to posts:
 *   post:
 *     description: To add like to posts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the user.
 *         in: header
 *         required: true
 *         type: string
 *       - name: like
 *         description: adding like to the post
 *       - name: postid
 *         description: postid which is needed to be liked
 *         in: params
 *         required: true
 *         type: integer
 *     tags:
 *       - Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */

Router.post("/addlike/:postId",isAuthorized,usercontroller.addlike)
/**
 * @swagger
 *
 * /Uncomment  the posts:
 *   Delete:
 *     description: To  uncomment the post using commentId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the user.
 *         in: header
 *         required: true
 *         type: string
 *       - name: postid
 *         description: postid which is needed to be uncommented
 *         in: params
 *         required: true
 *         type: integer
 *     tags:
 *       - Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.delete("/uncomment/:commentId",isAuthorized,usercontroller.uncomment)
/**
 * @swagger
 *
 * /Unlike posts:
 *   Delete:
 *     description: To unlike the post using likeId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the user.
 *         in: header
 *         required: true
 *         type: string
 *       - name: likeId
 *         description: postid which is needed to be uncommented
 *         in: params
 *         required: true
 *         type: integer
 *     tags:
 *       - Users operations
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.delete("/unlike/:likeId",isAuthorized,usercontroller.unlike)
/**
 * @swagger
 *
 * /Updateanypostbyadmin:
 *   post:
 *     description: To update anypost by Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authentication Token of the Admin.
 *         in: header
 *         required: true
 *         type: string
 *       - name: title
 *         description: Title of the post.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: content of the post.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: PostId
 *         description: Post Id of the needed post
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *          description: Success response
 */
Router.put("/updateanypost/:postId", isAuthorized,isAdmin,usercontroller.updateanypost)

const uploadService = multer();

Router.post("/upload", uploadService.array('photos', 10),usercontroller.fileupload)


module.exports = Router;

