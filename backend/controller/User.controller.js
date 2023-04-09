const User = require("../model/user.model");
const UploadImageandGetUrl = require("../utils/Cloudinary");

exports.GetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.send({ message: "No User Found" });
    }

    return res.status(200).send({
      userid: user._id,
      name: user.name,
      username: user.username,
      about: user.about,
      dpURL: user.dpURL,
      isVerified: user.isVerified,
      followers: user.followers,
      following: user.following,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.UpdateUserDetails = async (req, res) => {
  try {
    const { username, name, about } = req.body;
    let id = req.user.userId;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send({ message: "No User Found" });
    }
    if (username) {
      user.username = username;
    }
    if (name) {
      user.name = name;
    }
    if (about) {
      user.about = about;
    }
    const Updated = await user.save();

    return res.status(200).send({ Updated });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.UpdateDp = async (req, res) => {
  try {
    const { dpUrl } = req.body;

    let id = req.user.userId;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send({ message: "No User Found" });
    }
    const dpURL = await UploadImageandGetUrl(dpUrl, Date.now());
    console.log(dpURL);
    user.dpURL = dpURL;
    const Updated = await user.save();

    return res.status(200).send({ Updated });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.FollowUser = async (req, res) => {
  try {
    if (req.user.userId === req.params.userId) {
      return res
        .status(400)
        .send({ message: "You cannot Follow Your Own account" });
    }
    const FromUser = await User.findById(req.user.userId);
    const ToUser = await User.findById(req.params.userId);

    if (FromUser.following.includes(req.params.userId)) {
      return res.status(200).send({ message: "Invalid Request" });
    } else if (ToUser.followers.includes(req.user.userId)) {
      return res.status(200).send({ message: "Invalid Request" });
    } else {
      FromUser.following.push(req.params.userId);
      ToUser.followers.push(req.user.userId);
      await FromUser.save();
      await ToUser.save();
    }

    return res.status(201).send(FromUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
