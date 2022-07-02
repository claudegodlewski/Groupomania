// Importation du package Express.
const express = require('express');

/*
Importation des middlewares et du contrôleur.
*/
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
// Important: permet d'empêcher la suppression d'une post sans être l'auteur.
const idSecurity = require('../middleware/idSecurity');

/*
Méthode "express.router()": permet de créer un routeur pour les routes de l'application.
 Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
const router = express.Router();

/*
 Routeur Express.
  Source:
   https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, idSecurity, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, idSecurity, postCtrl.modifyPost);
router.post("/:id/like", auth, postCtrl.likePost);

// Exportation du routeur.
module.exports = router;