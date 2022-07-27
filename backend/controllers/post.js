// Importation du modèle des modèles.
const Post = require ('../models/post');
const User = require('../models/user');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

/*
  Exportation des méthodes et attribution aux routes.
   Source: https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466459-optimisez-la-structure-du-back-end
*/
exports.postMessage = (req, res, next) => {
  const postObject = { ...req.body };
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    usersLiked: [],
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Message posté.'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllMessages = (req, res, next) => {
  const sort = { _id: -1}
    Post.find().sort(sort).then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

exports.getOneMessage = (req, res, next) => {
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
}

exports.modifyMessage = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.secretToken);
  const idOfTheUser = decodedToken.userId;
  Post.findOne({ _id: req.params.id }).then((a)=>{

    User.findOne({
      _id: idOfTheUser
    }).then((b) => {

      if (b.systemAdministrator == true || a.userId == idOfTheUser) {

        // Suppression de l'ancienne image en cas de modification.
        if (req.file) {

          Post.findOne({ _id: req.params.id }).then((post) => {
      
            const nomMessage = post.imageUrl.split('/images/')[1];
      
            fs.unlink(`images/${nomMessage}`,
              (err) => {if (err) console.log(err);}
            );
      
          });
      
        }

        const postObject = req.file ?
          {
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          } : { ...req.body };
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Message modifié.'}))
          .catch(error => res.status(400).json({ error }));

      }

      else {

        res.status(403).json({ message: "Non autorisé"})

      }

    }).catch(error => res.status(400).json({ error }));

  })
};

exports.deleteMessage = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.secretToken);
  const idOfTheUser = decodedToken.userId;
    Post.findOne({ _id: req.params.id }).then((a)=>{
      User.findOne({
        _id: idOfTheUser
      }).then((b) => {
        if (a.userId == idOfTheUser || b.systemAdministrator == true) {
            Post.findOne({ _id: req.params.id })
            .then(post => {
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Message supprimé.'}))
                  .catch(error => res.status(400).json({ error }));
              });
          })
          .catch(error => res.status(400).json({ error }));
        } else {
          res.status(403).json({ message: "Non autorisé."})
        }
      })
    })
};

// # Code obsolète (permet de voter plusieurs fois) #
// exports.likeMessage = (req, res, next) => {
//   // MAJ base de donnée.
//   Post.updateOne(
//     { _id: req.params.id }, 
//     { $inc: { likes: 1 }, // $inc: incrémentation du champ "likes" (1 dans la BDD).
//       $push: { usersLiked: req.body.userId } // $push: ajout du 'userId' dans le champs "usersLiked" de la BDD.
//     }
//   )
//     .then(() => res.status(200).json({ message: 'La publication a été aimée.' }))
//     .catch((error) => res.status(400).json({ error: error }))
// }

exports.likeMessage = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.secretToken);
  const idOfTheUser = decodedToken.userId;

  Post.findOne({ _id: req.params.id }).then((a)=>{

    if (a.usersLiked.includes(idOfTheUser)) // Sécurité: si userLiked contient l'ID de l'utilisateur,  alors stopper éxécution.

      return;
              
          {

              Post.updateOne(
                  { _id: req.params.id }, 
                  { $inc: { likes: 1 }, // $inc: incrémentation du champ "likes" (1 dans la BDD).
                      $push: { usersLiked: req.body.userId } // $push: ajout du 'userId' dans le champs "usersLiked" de la BDD.
                  }
              )
                  .then(() => res.status(200).json({ message: 'La publication a été aimée.' }))
                  .catch((error) => res.status(400).json({ error }))
      
          } 

      });

};