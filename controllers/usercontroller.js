const { Post } = require("../models/index");
const { User } = require("../models/index");
crypto = require("crypto");
const { sgMail } = require("@sendgrid/mail");
const { sendEmail } = require("../utils/email");

const bcrypt = require("bcrypt");

require("dotenv").config();
//user can create post
exports.addpost = async ({ body, user }, res) => {
  const { title, description } = body;

  const payload = {
    title,
    description,
    user_id: user.id,
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

//user can get userposts list with postid

exports.getuserpostslist = async (req, res) => {
  try {
    // # of posts
    //list of posts

    const postId = req.params.postId;
    const posts = await Post.findAll({
      where: {
        Id: postId,
      },
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

  if(!token) throw new Error("token is not valid");
    try {
      const user = await User.findOne({ where: { resetPasswordToken: token } });
       if(!user) throw new Error("token is  invalid");

        const hashedPassword =  await bcrypt.hash(password, 10);
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




