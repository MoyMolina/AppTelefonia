const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TelefoniaSchema = new Schema({
  name : String
});

const Telefonia = mongoose.model('Telefonia', TelefoniaSchema);

module.exports = Telefonia;
