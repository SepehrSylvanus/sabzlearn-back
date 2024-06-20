const userModel = require("../../models/user");
const registerValidator = require("./../../validators/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  console.log(req.body);
  const validationResult = registerValidator(req.body);

  if (validationResult != true) {
    return res.status(422).json(validationResult);
  }

  const { username, name, email, password, phone } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    return res.status(409).json({
      message: "username or email is duplicated",
    });
  }

  const countOfUsers = await userModel.countDocuments();

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await userModel.create({
    email,
    username,
    name,
    phone,
    password: hashedPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign(
    {
      id: user._id,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: "30 day",
    }
  );

  res.status(201).json({
    user: userObject,
    accessToken,
  });
};

exports.login = async (req, res) => {};

exports.getMe = async (req, res) => {};
