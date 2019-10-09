const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  name: String,
  address: String,
  postalcode: Number,
  phonenumber: String,
  email: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);