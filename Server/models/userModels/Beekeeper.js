const mongoose = require('mongoose');
const encryption = require('../../util/encryption');

const beekeeperSchema = new mongoose.Schema({
    firstName: { type: mongoose.Schema.Types.String, required: false },
    lastName: { type: mongoose.Schema.Types.String, required: false },
    companyName: { type: mongoose.Schema.Types.String, required: false },
    location: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
});

beekeeperSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const Beekeeper = mongoose.model('Beekeeper', beekeeperSchema);



module.exports = Beekeeper;
