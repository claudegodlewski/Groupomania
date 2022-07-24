const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  systemUser: { type: String, required: true },
  dateHeure: { type: String, required: true },
  text: { type: String, trim: true, maxlenght: 500 },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
});

module.exports = mongoose.model('Post', postSchema);