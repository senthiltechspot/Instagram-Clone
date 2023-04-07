const User = require("../model/user.model");
const Post = require("../model/post.model");
const jwt = require("jsonwebtoken");
const UploadImageandGetUrl = require("../utils/Cloudinary");

exports.GetAllPosts = async (req, res) => {
  const posts = await Post.find();
  return res.send(posts);
};

exports.CreatePost = async (req, res) => {
  const { title, imageUrl } = req.body;
  try {
    // Create Public image URL
    const imageGenUrl = await UploadImageandGetUrl(imageUrl, Date.now());

    const post = new Post({
      title,
      image: imageGenUrl,
      userId: req.user.userId,
    });
    await post.save();
    return res.status(201).send(post);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.LikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    // Find Post
    const post = await Post.findById(postId);
    // If Post Not Found
    if (!post) {
      return res.status(404).send("Post not found");
    }
    // Check User is already liked or not
    if (post.likes.includes(req.user.userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    //Save userid in post
    post.likes.push(req.user.userId);
    await post.save();
    return res.send(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.CommentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    // Find Post by Post-id
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    // Save the Comments from users
    const comment = {
      text,
      userId: req.user.userId,
      Date: new Date(),
    };
    post.comments.push(comment);
    await post.save();
    return res.status(201).send(post);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.deleteByid = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    // Check the Post delete request is by Authorized User
    if (post.userId.toString() === req.user.userId) {
      // Find Post and Delete by using deleteOne
      const deletedPost = await Post.deleteOne({ _id: req.params.postId });
      // If no post found
      if (deletedPost.deletedCount === 0) {
        return res.status(404).send({ message: "Post not found" });
      }
      return res.send({ message: "Post deleted successfully" });
    } else {
      return res.status(401).send({ message: "UnAuthorized" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};

exports.GetPostById = async (req, res) => {
  try {
    // Find Post
    const post = await Post.findById(req.params.postId);
    return res.send(post);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};
