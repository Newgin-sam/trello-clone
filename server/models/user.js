const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    googleId: String,
    facebookId: String
})

const User = mongoose.model('User', UserSchema);

module.exports = User;