const mongoose = require('mongoose');
const encryption = require('../../util/encryption');

const userRoleSchema = new mongoose.Schema({
  
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    role: { type: mongoose.Schema.Types.String, required: true }
});

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;
