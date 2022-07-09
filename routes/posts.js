// Importation.
const express = require('express');

// Contrôleur.
const postCtrl = require('../controllers/post');

// Middlewares.
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const idSecurity = require('../middleware/idSecurity');

// Routeur.
const router = express.Router();

router.post('/', auth, /*multer,*/ postCtrl.createPost);
router.delete('/:id', auth, idSecurity, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, idSecurity, postCtrl.modifyPost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;