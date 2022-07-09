// Importation.
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

module.exports = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
        .then(post => {
            // Extraction du token du header "Authorization" de la requête entrante.
            const token = req.headers.authorization.split(' ')[1];
            // Utilisation de la fonction verify pour décoder le token.
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            // Extraction de l'ID utilisateur du token.
            const userId = decodedToken.userId;

            // Si il y a un ID utilisateur et si il est différent de celui extrait du token, alors afficher un message d'erreur.
            if(post.userId && post.userId !== userId) {
                res.status(403).json({ message: 'Non autorisé' });
            } else {
                next();
            }
        })
        .catch(error => {
            res.status(401).json({ error })
        });
}