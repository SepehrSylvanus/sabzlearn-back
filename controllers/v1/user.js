const userModel = require("./../../models/user");
const banUserModel = require("./../../models/ban-phone");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

exports.changeRole = async (req, res) => {
  const { id } = req.body;
  const isValidUserId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidUserId) {
    return res.status(409).json({
      message: "User id is not valid",
    });
  }
  if (!isValidUserId) {
    return res.status(409).json({
      message: "User id is not valid",
    });
  }
  const user = await userModel.findOne({ _id: id });

  let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  const updatedUser = await userModel.findOneAndUpdate(
    { _id: id },
    {
      role: newRole,
    }
  );

  if (updatedUser) {
    return res.json({
      message: "User role changed successfully",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 12);
  }

  const user = await userModel
    .findByIdAndUpdate(
      {
        _id: req.user._id,
      },
      {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
      }
    )
    .select("-password")
    .lean();

  return res.json(user);
};
