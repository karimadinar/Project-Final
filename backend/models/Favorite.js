// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
