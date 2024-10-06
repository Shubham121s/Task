const express = require('express');
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const router = express.Router();

// Get all items
router.get('/', getItems);

// Create a new item
router.post('/', createItem);

// Update an item
router.put('/:id', updateItem);

// Delete an item
router.delete('/:id', deleteItem); 

module.exports = router;
