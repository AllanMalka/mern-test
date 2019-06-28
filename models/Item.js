const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create schema
const ItemSchema = new schema({
   name: {
       type: String,
       reqired: true,
   },
    date: {
       type: Date,
        default: Date.now
    },
    user: {
        type: schema.Types.ObjectId, ref: 'user',
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);