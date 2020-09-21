const mongoose = require('mongoose');
const {
	model,
	Schema
} = require('mongoose');

const userSchema = new Schema({
	name: String,
	password: String,
});

module.exports = mongoose.model('User', userSchema);