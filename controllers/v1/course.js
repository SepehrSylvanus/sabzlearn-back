const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  console.log("request = ", req.file);
  const {
    name,
    description,
    cover,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    creator: req.user.id,
    categoryID,
    support,
    price,
    href,
    status,
    discount,
    cover: req.file.filename,
  });
  const mainCourse = await courseModel
    .findById(course.id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};
