const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/Telefonia');
mongoose.connection
.once('open', () => console.log('Connection established'))
.on('error', (error)=> {
  console.log('warning : ' + error);
});
