import Category from "../models/category-model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, description });
    res.status(201).json({ message: "Category created successfully", category });
  } catch (err) {
    res.status(500).json({ message: "Unable to create category", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch categories", error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ message: "Unable to update category", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete category", error: err.message });
  }
};
