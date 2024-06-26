const userModel = require("./../../models/user");
const banUserModel = require("./../../models/ban-phone");
const mongoose = require("mongoose");
exports.banUser = async (req, res) => {
  const mainUser = await userModel.findOne({
    _id: req.params.id,
  });

  const banUserResult = banUserModel.create({
    phone: mainUser.phone,
  });

  if (banUserModel) {
    return res.status(200).json({
      message: "User banned successfuly",
    });
  }

  return res.status(500).json({
    message: "Server error",
  });
};

exports.getAll = async (req, res) => {
  const users = await userModel.find({});

  return res.json(users);
};

exports.removeUser = async (req, res) => {
  const isValidUserId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidUserId) {
    return res.status(409).json({
      message: "User id is not valid",
    });
  }

  const removedUser = await userModel.findOneAndDelete({ _id: req.params.id });

  if (!removedUser) {
    res.status(404).json({
      message: "There is no user",
    });
  }

  return res.status(200).json({
    message: "User removed successfully",
  });
};
