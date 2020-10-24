const mongoose = require('mongoose');
 
const file = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  file: {
    type: Buffer,
    required: true
  },
  fileName: {
    type: String,
    required: true
  }
});

module.exports =  mongoose.model('Files', file);