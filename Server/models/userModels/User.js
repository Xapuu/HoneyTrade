const mongoose = require('mongoose');
const encryption = require('../../util/encryption');

const userSchema = new mongoose.Schema({
    firstName: { type: mongoose.Schema.Types.String,  required: true },
    lastName: { type: mongoose.Schema.Types.String,  required: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;
