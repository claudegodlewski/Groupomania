// Importation du package Express.
const express = require('express');

/*
Importation des middlewares et du contrôleur.
*/
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post');

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
router.post('/', auth, multer,  postCtrl.postMessage);
router.get('/:id', auth, postCtrl.getOneMessage);
router.put('/:id', auth, multer, postCtrl.modifyMessage);
router.delete('/:id', auth, postCtrl.deleteMessage);
router.get('/', auth, postCtrl.getAllMessages);
router.post("/:id/like", auth, postCtrl.likeMessage);

// Exportation du routeur.
module.exports = router;