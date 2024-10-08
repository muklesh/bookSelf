const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    language: { type: String, required: true },
    publication: { type: String, required: true },
    category: { type: String },
    url: { type: String },
    googleBookId: { type: String, unique: false } // Ensure uniqueness is not enforced
  });

module.exports = mongoose.model('books', schema);
