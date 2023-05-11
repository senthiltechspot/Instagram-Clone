const PostController = require("../controller/Post.controller");
const { authenticate } = require("../middleware/Authenticate");
module.exports = (app) => {
  // Get all Posts
  app.get("/api/posts", PostController.GetAllPosts);

  // Create a Post
  app.post("/api/posts", authenticate, PostController.CreatePost);

  // like a Post
  app.post("/api/posts/:postId/like", authenticate, PostController.LikePost);

  // Comment on a Post
  app.post(
    "/api/posts/:postId/comment",
    authenticate,
    PostController.CommentPost
  );

  // Delete a Post By postid
  app.delete(
    "/api/posts/:postId/delete",
    authenticate,
    PostController.deleteByid
  );

  // Get Post by id
  app.get("/api/posts/:postId", PostController.GetPostById);
};
