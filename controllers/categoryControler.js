import {Category} from '../model/index.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json({message:'success',data:newCategory});
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({message:'success',data:categories});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json({message:'success',data:category});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category' });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.name = name || category.name;

    await category.save();
    res.status(200).json({message:'success',data:category});
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully',data:category });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
