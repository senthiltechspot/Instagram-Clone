const UserController = require("../controller/User.controller");
const { authenticate } = require("../middleware/Authenticate");
module.exports = (app) => {
  // get user by userId
  app.get("/api/user/:userId", authenticate, UserController.GetUserById);

  // Update User Details
  app.post("/api/user/", authenticate, UserController.UpdateUserDetails);

  // Update User Profile
  app.post("/api/user/dp", authenticate, UserController.UpdateDp);

  // Create User Follow Request
  app.post("/api/user/:userId/follow", authenticate, UserController.FollowUser);
};
