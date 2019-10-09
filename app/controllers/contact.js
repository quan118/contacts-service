const Contact = require('../models/contact.js');

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Contact name can not be empty"
    });
  }

  const contact = new Contact({
    name: req.body.name,
    address: req.body.address,
    postalcode: Number.isInteger(req.body.postalcode) || null,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
  });

  contact
    .save()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Contact.'
      });
    });
};

exports.findAll = (req, res) => {
  Contact
    .find()
    .then(contacts => { res.send(contacts); })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving contacts.'
    });
  });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Contact name can not be empty'
    });
  }

  Contact.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    address: req.body.address,
    postalcode: Number.isInteger(req.body.postalcode) || null,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
  }, {new: true})
  .then(contact => {
    if (!contact) {
      return res.status(404).send({
        message: 'Contact not found with id ' + req.params.id
      });
    }
    res.send(contact);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Contact not found with id ' + req.params.id
      });
    }
    return res.status(500).send({
      message: 'Error updating contact with id ' + req.params.id
    });
  });
};

exports.delete = (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
  .then(contact => {
    if (!contact) {
      return res.status(404).send({
        message: 'Contact not found with id ' + req.params.id
      });
    }
    res.send({ message: 'Contact deleted successfully!' });
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: 'Contact not found with id ' + req.params.id
      });
    }
    return res.status(500).send({
      message: 'Could not delete contact with id ' + req.params.id
    });
  });
};
