const express = require('express');
const router = new express.Router();

const items = require('../fakeDb');
const ExpressError = require('../expressError')

//get all existing items from the database
router.get('/', (req, res) => {
    res.json({items})
})

//create a new item and add to the database
router.post('/', (req, res) => {
    const newItem = {name: req.body.name, price: req.body.price};
    items.push(newItem);
    return res.json({added: newItem});
})

//search for specific item by name in the database
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
    res.send(foundItem);
})

//update the name of the item in the database
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name
    res.json({updated: foundItem});
})

//delete the item in the database
router.delete('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({deleted: foundItem});
})


module.exports = router;