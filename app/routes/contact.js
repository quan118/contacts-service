module.exports = app => {
  const contacts = require('../controllers/contact.js');

  app.post('/contact', contacts.create);

  app.get('/contact', contacts.findAll);

  app.put('/contact/:id', contacts.update);

  app.delete('/contact/:id', contacts.delete);
}
