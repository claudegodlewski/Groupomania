const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  systemUser: { type: String, required: true },
  userId: { type: String, required: true },
  text: { type: String, trim: true, maxlenght: 500 },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: [String], required: true }
});

module.exports = mongoose.model('Post', postSchema);