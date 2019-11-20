const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Telefonia', {
  useCreateIndex: true,
  useUrlParser: true,
  useFindAndModify: false
})

  .then(db => console.log('DB is Connected'))
  .catch(err => console.error(err));
