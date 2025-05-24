import Category from "../models/category.model.js";

// Add new category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const upperCaseName = name.trim().toUpperCase();

        const newCategory = new Category({ name: upperCaseName });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: "Failed to create category" });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const upperCaseName = name.trim().toUpperCase();

        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            { name: upperCaseName },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update category" });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category" });
    }
};

