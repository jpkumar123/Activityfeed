const {Post}= require('../models/index');
const {User}= require('../models/index');
//user can create post
exports.addpost=async ({ body, user }, res) => {
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
  }

 //user can update post

 exports.updatepost =async ({ params, body }, res, next) => {
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
  }
//user can delete post

exports.deletepost =async (req,res)=>{
    const postId = req.params.postId;
    try{
        const post = await Post.findOne({
            where: {
                id: postId
            }
        });

        await post.destroy();

        res.send({
            status: "success"
        })

    }catch(err){
        res.status(400).send({
            error: err.message
        })
    }
}


//user can get userposts list with postid

exports.getuserpostslist=async(req, res)=>{
    try{
        // # of posts
        //list of posts

        const postId = req.params.postId;
       const posts = await Post.findAll ({where:{
            Id:postId
        }})

        res.send({
            count : posts.length,
            posts: posts
        })

    }catch(err){
        res.status(400).send({
            error: err.message
        })
    }
};





