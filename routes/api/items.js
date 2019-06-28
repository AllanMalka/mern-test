const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item model
const Item = require('../../models/Item');

//Create
// @route   POST api/items
// @desc    Create an item
// @access  Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        user: req.body.user
    });
    newItem
        .save()
        .then(item => {
            Item
                .findById(item._id)
                .populate('user')
                .then(item => res.json(item))
                .catch(err => res.status(404).json({success: false}));
        });
});

//Read
// @route   GET api/items/
// @desc    Get one item by id
// @desc    or all items if id is null
// @access  Public
router.get('/', (req, res) => {
    if(req.body.id) {
        Item
            .findById(req.body.id)
            .populate('user')
            .then(item => res.json(item))
            .catch(err => res.status(404).json({success: false}));
    } else {
        Item
            .find()
            .populate('user')
            .sort({'date': -1})
            .then(items => res.json(items))
            .catch(err => res.status(404).json({msg: err.message}));
    }
});

//Update
// @route   PUT api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', auth, (req, res) => {
    Item.findOneAndUpdate({"_id":req.params.id}, {name: req.body.name }, {new: true})
        .populate('user')
        .then(item => res.json(item))
        .catch(err => res.status(404).json({msg:err.message}));
});

//Delete
// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove())
        .then(() => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;