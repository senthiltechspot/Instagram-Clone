const authController = require("../controller/Auth.controller");
module.exports = (app) => {
  app.post("/api/sendOTP", authController.sendOTP);

  app.post("/api/verifyOTP", authController.verifyOTP);
};
