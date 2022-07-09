// Importation.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Créer un compte.
exports.signup = (req, res, next) => {
  // Salage du mot de passe 10 fois.
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// S'identifier.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé" });
        }
        /* 
        Bcrypt créer un hash avec le mot de passe entré, puis le compare au hash stocké dans la base de données: ces deux hashs ne sont pas les mêmes.
        Bcrypt ne peut pas décrypter ses propres hashs: il peut indiquer si les deux hashs ont été générés à l'aide d'un même mdp.
        */
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {

            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect" });
            }

            res.status(200).json({

              userId: user._id,
              token: jwt.sign( // Chiffrement d'un nouveau token (fonction sign) -> contient l'ID utilisateur en tant que payload.
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET', // Chaine secrête de chiffrement: à remplacer par une chaîne aléatoire beaucoup plus longue dans un cas réel. Le token est renvoyé au front-end (Bearer etc.)
                  { expiresIn: '24h' }
                ),
              message: "Utilisateur connecté"
            });

          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };