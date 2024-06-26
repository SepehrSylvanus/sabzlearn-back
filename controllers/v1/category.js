const categoryModel = require("../../models/category");
const { isValidObjectId } = require("mongoose");
exports.create = async (req, res) => {
  const { title, href } = req.body;

  const category = await categoryModel.create({ title, href });

  return res.status(201).json(category);
};
exports.getAll = async (req, res) => {
  const categories = await categoryModel.find({});
  res.json(categories);
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({
      message: "Desired id is not correct!",
    });
  }

  const deletedCategory = await categoryModel.findOneAndDelete({ _id: id });

  return res.json(deletedCategory);
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(409).json({
      message: "Desired id is not correct!",
    });
  }
  const { title, href } = req.body;

  const updatedCategory = await categoryModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      href,
    }
  );

  if (!updatedCategory) {
    res.status(404).json({
      message: "Category not found",
    });
  }

  return res.json(updatedCategory);
};
