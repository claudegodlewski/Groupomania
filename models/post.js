// Importation.
const mongoose = require('mongoose');

// Modèle.
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userTitle: { type: String, required: true },
  UserMessage: { type: String, required: true },
  //imageUrl: { type: String, required: false },
  likes: { type: Number, default: 0, required: true },
  dislikes: { type: Number, default: 0, required: true },
  usersLiked: { type: Array, default: [], required: true },
  usersDisliked: { type: Array, default: [], required: true }
});

module.exports = mongoose.model('post', postSchema);