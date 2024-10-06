const Item = require('../models/Item');

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Add a new item
const createItem = async (req, res) => {
  const { name, price, quantity } = req.body;

  // Validate request body
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'Name is required and price must be a number.' });
  }

  try {
    const newItem = new Item({ name, price, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
};

// Update an item
const updateItem = async (req, res) => {
  const { id } = req.params;

  // Validate request body
  const { name, price, quantity } = req.body;
  if (!name && (typeof price !== 'number' && typeof quantity !== 'number')) {
    return res.status(400).json({ message: 'At least one of name, price, or quantity must be provided.' });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // Check if the item was found and updated
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    // Check if the item was found and deleted
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

module.exports = { getItems, createItem, updateItem, deleteItem };
