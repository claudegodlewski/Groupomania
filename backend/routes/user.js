// Importation.
const express = require('express');

// Contrôleur.
const userCtrl = require('../controllers/user');

// Routeur.
const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;