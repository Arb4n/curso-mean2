// 4.13.1 : CREATION de
// >>
// index.js

// 4.13.2 : 
// >>
// 'user strict'
// pour pouvoir intégrer les nouvelles instructions de js
//  ↓           ↓
'use strict'

// 4.13.3 : charger le module de mongodb
// ↓           ↓ 
const mongoose = require('mongoose');
// 4.14.2 : charger le module app 
// et configuration d'un port pour l'api, 
// pour le serveur web pour le backend de node :
const app = require("./app");
const port = process.env.PORT || 3977;



// 4.13.4 : faire la connection à mongodb:
// // ↓           ↓
// mongoose.connect('mongodb://127.0.0.1:27017/curso_mean2', (err, res) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log("Tkt, la base de données s'est lancée en toute sérénité");
//     }
// });


// mongoose.connect('mongodb://localhost:27017/curso_mean2')
// On ADRAR PC : erreur de lancement, connexion impossible à la base de données; 
// soluion : passer de ↑ à ↓   ; but why ?? 
mongoose.connect('mongodb://127.0.0.1/curso_mean2')

  .then(() => {
    console.log("La base de données s'est correctement lancée");
    //   4.14.2 >>> mettre le serveur en écoute : 
    //  listen : pointe vers le bon port à "écouter"
    // function : fonction de chargement 
      app.listen(port, function () {
          console.log("Serveur de l'API Rest de musique écoutant l'adresse http://localhost:" + port);
      });     

  })
  .catch((err) => {
    console.error("Une erreur s'est produite lors de la connexion à la base de données : ", err);
    
  });
// << THen > app.js - 4.14.3

// NB>>>> mot-clé "throw" = utilisé pour générer une exception/ erreur, qui peut être
// capturée et gérée plus tard dans le code << <NB
// OU >>>
//     mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) => {
//         try {
//             if (err) {
//                 throw err;
//             } else {
//                 console.log("la base de données s'est correctement lancée");
//             }
//         } catch (error) {
//             console.error("Une erreur s'est produite : ", error);
//         }
//     });
// <<<OU
// COMMENT UTILISER LA FONCTION ? → nodemon ; aller à : package.json (l.7)
// >>> ajouter une commande start : 
// >> 
//     "scripts" : {
//     "start": "nodemon index.js",
//             ...
    
// }