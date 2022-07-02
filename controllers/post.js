// Importation du modèle des posts.
const Post = require('../models/post');
const fs = require('fs');

/*
  Exportation des méthodes et attribution aux routes.
   Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/

// Création d'un post.
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => res.status(201).json({ message: "Post enregistré"}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Afficher un post.
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modification d'un post.
exports.modifyPost = (req, res, next) => {

  // Suppression de l'ancienne image en cas de modification.
  if (req.file) {

    Post.findOne({ _id: req.params.id }).then((post) => {

      const nomPost = post.imageUrl.split('/images/')[1];

      fs.unlink(`images/${nomPost}`,
        (err) => {if (err) console.log(err);}
      );

    });

  }

  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post modifiée"}))
    .catch(error => res.status(400).json({ error }));
};

// Suppression d'un post.
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé"}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Aimer un post.
exports.likePost = function (request, response, next) {
  Post.findOne({ _id: request.params.id })
    .then(function (post) {
      switch (request.body.like) {
        // Scénario 1: post aimé.
        case 1:
          if (
            !post.usersLiked.includes(request.body.userId) &&
            request.body.like === 1
          ) {
            // MAJ base de donnée.
            Post.updateOne(
              { _id: request.params.id },
              { $inc: { likes: 1 }, // $inc: incrémentation du champ "likes" (1 dans la BDD).
                $push: { usersLiked: request.body.userId } // $push: ajout du 'userId' dans le champs "usersLiked" de la BDD.
              }
            )
              .then(function () {
                response
                  .status(201)
                  .json({ message: "La post a été aimé" });
              })
              .catch(function (error) {
                response.status(400).json({ error: error });
              });
          }
          break;

        // Scénario 2: annulation.
        case 0:
             if (post.usersLiked.includes(request.body.userId)) {

            // MAJ base de donnée.
            Post.updateOne(
              { _id: request.params.id },
              
              
              {
                $inc: { likes: -1 }, // $inc: décrémentation du champs "likes" (-1 dans la BDD).
                $pull: { usersLiked: request.body.userId } // $pull: suppression de l'userId du champ "usersLiked" dans la BDD.
              }
            )
              .then(function () {
                response
                  .status(201)
                  .json({ message: "Annulation" });
              })
              .catch(function (error) {
                response.status(400).json({ error: error });
              });
          }
          break;
      }
    })
};