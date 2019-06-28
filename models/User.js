const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create schema
const UserSchema = new schema({
    name: {
        type: String,
        reqired: true,
    },
    email: {
        type: String,
        reqired: true,
        unique: true
    },
    password: {
        type: String,
        reqired: true,
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);