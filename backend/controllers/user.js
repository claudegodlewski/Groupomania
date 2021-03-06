/*
  Package de chiffrement bcrypt.
    Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466506-creez-des-utilisateurs
*/
const bcrypt = require ('bcrypt');

/*
  Package de gestion des tokens JSON.
    Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466557-creez-des-tokens-dauthentification
*/
const jwt = require('jsonwebtoken');

const CryptoJS = require('crypto-js');

const User = require('../models/user');
const env = require('dotenv').config();

/*
  Exportation des méthodes et attribution aux routes.
   Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
exports.signup = (req, res, next) => {
  const emailChiffre = CryptoJS.RIPEMD160(req.body.email, process.env.secretEmail).toString();
  // Salage du mot de passe 10 fois.
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          systemAdministrator: false,
          systemUser: req.body.systemUser,
          email: emailChiffre,
          password: hash, 
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
  const emailChiffre = CryptoJS.RIPEMD160(req.body.email, process.env.secretEmail).toString();
  User.findOne({ email: emailChiffre })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé.' });
      }
      /* 
      Bcrypt créer un hash avec le mot de passe entré, puis le compare au hash stocké dans la base de données: ces deux hashs ne sont pas les mêmes.
      Bcrypt ne peut pas décrypter ses propres hashs: il peut indiquer si les deux hashs ont été générés à l'aide d'un même mdp.
      */
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
          }

          res.status(200).json({

            userId: user._id,
            token: jwt.sign( // Chiffrement d'un nouveau token (fonction sign) -> contient l'ID utilisateur en tant que payload.
              { userId: user._id },
              process.env.secretToken, // Chaine secrête de chiffrement: à remplacer par une chaîne aléatoire beaucoup plus longue dans un cas réel. Le token est renvoyé au front-end (Bearer etc.)
              { expiresIn: '7h' }
            ),
            systemAdministrator: user.systemAdministrator,
            systemUser: user.systemUser,
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};