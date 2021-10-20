const { Post } = require("../models/index");
const { User } = require("../models/index");
crypto = require("crypto");
const { sgMail } = require("@sendgrid/mail");
const { sendEmail } = require("../utils/email");
const { Comment } = require("../models/index");
const { Like } = require("../models/index");
const models = require("../models/index");
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');

require("dotenv").config();
//user can create post
exports.addpost = async ({ body, user, authorId }, res, next) => {
  const { title, description } = body;
  const currentUser = user;
  const payload = {
    title,
    description,
    user_id: user.id,
    authorId: currentUser.id,
  };

  console.log("debug", payload);

  try {
    const newPost = await Post.create(payload);
    res.status(200).send(newPost);
  } catch (error) {
    console.log(error);
    res.status(401).end("error");
  }
};

//user can update post

exports.updatepost = async ({ params, body }, res, next) => {
  const postId = params.postId;
  const title = body.title;
  const description = body.description;

  const post = await Post.findOne({ where: { id: postId } });
  console.log({
    post,
  });

  try {
    if (post) {
      // post.dataValues.title = title;
      // post.dataValues.description = description;
      await post.update({
        title,
        description,
      });
      res.status(200).send({ status: "success", post });
    } else {
      res.send("Invaliduserid");
      throw new Error("Invalid userId");
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
//user can delete post

exports.deletepost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });

    await post.destroy();

    res.send({
      status: "success",
    });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

//user can get userposts list with id

exports.getuserpostslist = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const posts = await Post.findAll({
      where: {
        id: user_id,
      },
      include: [
        {
          model: models.Comment,
          as: "Comments",
        },
        {
          model: models.Like,
          as: "Like",
        },
      ],
    });

    res.send({
      count: posts.length,
      posts: posts,
    });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

exports.postforgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.send("Email  not found. ");
    }
    crypto.randomBytes(20, (error, buffer) => {
      const resetPasswordToken = buffer.toString("hex");
      user
        .update({
          resetPasswordToken,
        })
        .then(async () => {
          const RESET_LINK = `${process.env.WEB_URL}/change-password/${resetPasswordToken}`;
          await sendEmail({
            from: "abhijoseph128@gmail.com",
            to: user.email,
            subject: "here is your password reset link  😋",
            text: "....",
            html: `
            <div>
              <h2>😇 see below </h2>
              ${RESET_LINK}
            </div>
          `,
          });
          res.json({
            message:
              "Please use this Reset password link to create new password.",
          });
        });
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(400).send({ error: error.message });
  }
};

exports.postresetPassword = async (req, res) => {
  const { password, token } = req.body;

  if (!token) throw new Error("token is not valid");
  try {
    const user = await User.findOne({ where: { resetPasswordToken: token } });
    if (!user) throw new Error("token is  invalid");

    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
      password: hashedPassword,
      resetPasswordToken: null,
    };
    await user.update(payload);
    await sendEmail({
      from: "abhijoseph128@gmail.com",
      to: user.email,
      subject: "password has been changed",
      text:
        "👀 you have recently changed your password  , if you have not performed , delet",
      html: `<h1>Delete the RAM Asap 👀👀👀👀</h1>`,
    });

    return res.json({ message: "Password is changed." });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
exports.addcomment = async ({ params, body, user }, res) => {
  const { comment } = body;
  const postId = +params.postId;

  const payload = {
    comment: comment,
    postid: postId,
    user_id: user.id,
  };

  console.log("debug", params);

  try {
    const newComment = await Comment.create(payload);
    res.status(200).send(newComment);
  } catch (error) {
    console.log(error);
    res.status(401).end("error");
  }
};
exports.uncomment = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });

    await comment.destroy();

    res.send({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
};

exports.addlike = async ({ params, body, user }, res) => {
  const postId = +params.postId;
  const payload = {
    postid: postId,
    user_id: user.id,
  };
  console.log("debug", params);
  try {
    const newlike = await Like.create(payload);
    res.status(200).send(newlike);
  } catch (error) {
    res.status(401).end("error");
  }
};

exports.unlike = async (req, res) => {
  const likeId = req.params.likeId;
  try {
    const like = await Like.findOne({
      where: {
        id: likeId,
      },
    });

    await like.destroy();

    res.send({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err.message,
    });
  }
};

exports.updateanypost = async ({ params, body }, res, next) => {
  const postId = params.postId;
  const title = body.title;
  const description = body.description;

  const post = await Post.findOne({ where: { id: postId } });
  console.log({
    post,
  });

  try {
    if (post) {
      // post.dataValues.title = title;
      // post.dataValues.description = description;
      await post.update({
        title,
        description,
      });
      res.status(200).send({ status: "success", post });
    } else {
      res.send("Invaliduserid");
      throw new Error("Invalid userId");
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

exports.getpage = async (req, res) => {
  let limit = 4; // number of records per page
  let offset = 0;
  User.findAndCountAll()
    .then((data) => {
      const page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      console.log("limit", limit);
      User.findAll({
        limit: limit,
        offset: offset,
        $sort: { id: 1 },
      })
      .then((list) => {
       
        res
          .status(200)
          .json({ result: list, count: data.count, pages: pages });
      }).catch(err=>{
        throw err;
      });
    })
    .catch(function (error) {
      console.log("error", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.postimages = async(req,res) => {
  upload.array('files'), 
  res.json({status: 'ok', message: 'Pictures uploaded'});
}







