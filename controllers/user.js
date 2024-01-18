'use strict'

// 5.25.1>>>
// Importer les modules fs et path
// These modules provide functionality 
// for working with the file system and file paths, respectively.
const fs = require('fs');
const path = require('path');
// <<< 5.25.1

// 5.19.**>>> pour encrypter les mdps : 
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
// <<<5.19.**

// 5.21.3>>>
// pour pouvoir appeler le service, il faut le charge ici : 
const jwt = require('../services/jwt');

//<<< 5.21.3


function test(req, res) {
    res.status(200).send({
        message: 'Test : action du contrôleur d\'utilisateurs de l\'API Rest avec Node et Mongo'
    });
}


// function

// 5.19.**>>> pour encrypter les mdps : 
function saveUser(req, res) {
    const user = new User();

    const params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    // user.role = 'ROLE_USER';
    // 5.19.**>>> ↑↓    changement du rôle de user à admin 
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    // >>>DESECRATED - no callback <<< ↓       ↓
    // if (params.password) {
    //     // Encriptar contraseña y guardar datos
    //     // 5.19>>>
    //     bcrypt.hash(params.password, null, null, function(err, hash) {
    //         user.password = hash;
    //         if (user.name != null && user.surname != null && user.email != null) {
    //             // enregistrer l'utilisateur
    //             user.save((err, userStored) => {
    //                 if (err) {
    //                     res.status(500).send({ message: 'Erreur - Echec de l\'enregistrement de l\' Utilisateur ' });

    //                 } else {
    //                     if (!userStored) {
    //                         res.status(404).send({ message: 'Les données de l\'utilisateur n\'ont pas été enregistrées' })
    //                     } else {
    //                         res.status(200).send({ user: userStored })
    //                     }
    //                 }
    //             });

    //         } else {
    //             res.status(500).send({ message: 'Remplir toutes les zones vides' });
    //         }
    //     });
    // } else {
    //     res.status(500).send({ message: 'Insérer mot de passe' });
    // }


    //   ↓          ↓           ↓           ↓           ↓
    if (params.password) {
        bcrypt.hash(params.password, null, null, function (err, hash) {
            if (err) {
                res.status(500).send({ message: 'Erreur lors du hachage du mot de passe' });
            } else {
                user.password = hash;
                if (user.name && user.surname && user.email) {
                    user.save() // Suppr le callback ici
                        .then(userStored => {
                            if (!userStored) {
                                res.status(404).send({ message: 'Les données de l\'utilisateur n\'ont pas été enregistrées' });
                            } else {
                                res.status(200).send({ user: userStored });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({ message: 'Erreur - Échec de l\'enregistrement de l\'utilisateur' });
                        });
                } else {
                    res.status(500).send({ message: 'Remplir toutes les zones vides' });
                }
            }
        });
    } else {
        res.status(500).send({ message: 'Insérer un mot de passe' });
    }

}
// <<<5.19.**

// 5.20.1>>>
// Création d'une nouvelle méthode: est-ce que le mdp existe, et correspond avec la bdd ?
// la fonction reçoit une request et une response
// function loginUser(req, res) {
//     const params = req.body;
//     const email = params.email;

//     // utilisation du model 'user' et de l'ORM mongoose : ↓
//     User.findOne({ email: email.toLowerCase() }, (err, user) => {
//         if(err){
//             res.status(500).send({message: 'erreur dans la demande'});
//         }else {
//             if (!user) {
//                 res.status(404).send({ message: 'l\'utilisateur n\'existe pas' });
//             } else {
//                 // tester le mdp :
//                 bcrypt.compare(password, user.password, function (err, check) {
//                     if (check) {
//                         // Si le check est correct : envoyer les données de l'utilisateur connecté: ↓
//                         if (params.gethash) {
//                             // renvoyer un token de jwt
//                         } else {
//                             res.status(200).send({ user });

//                         }
//                     } else {
//                         // sinon, message suivant :
//                         res.status(404).send({ message: "L'utilisateur n'a pas pu se connecter" });
//                     }
//                 })
//             }
//         }
//     });
// }


async function loginUser(req, res) {
    const params = req.body;
    const email = params.email;
    const password = params.password;

    try {
        const user = await User.findOne({ email: email.toLowerCase() }).exec();
        if (!user) {
            res.status(404).send({ message: "L'utilisateur n'existe pas" });
            return;
        }

        // Ligne responsable de la vérification du mdp : 
        // elle retourne une promesse
        const check =  bcrypt.compare(password, user.password);

        if (check) {
            if (params.gethash) {
                // Renvoyer un token JWT (à implémenter)
                // Exemple : res.status(200).send({ user, token: createToken(user) });
                // 9:19 - <jwt.js > 5.21.2>>> implémentation du token jwt : ↓          ↓
                res.status(200).send({
                    token: jwt.createToken(user)  // Puis aller en haut de la page ↑   ↑   et charger services/ jwt ↑  ↑
                                        
                // <<< 5.21.2  implémentation du token jwt : ↑        ↑ 
                // <<< STOP >5.22
                })
            } else {
                res.status(200).send({ user });
            }
        } else {
            res.status(404).send({ message: "L'utilisateur n'a pas pu se connecter" });
        }
    } catch (err) {
        res.status(500).send({
            message: 'Erreur dans la demande', error: err
        });
    }
}
// <<<5.20.1 >routes>user.js > 5.20.2 >>> !!!>>> ne pas oublier de définir les routes !!!>><
// > intervention ext => MARCEAU<<
// > 5.21.00 > services>jwt.js

// >>>> 5.23.1 ACTUALIZAR UN USUARIO >>>

// function updateUser(req, res) {
//     var userId = req.params.id;
//     var update = req.body;

//     User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
//         if (err) {
//             // erreur 500 : erreur de serveur, mais aussi une réponse fourre-tout ;
//             res.status(500).send({ message: "Erreur : le profil utilisateur n'a pas été actualisé" });
//         }

//     })
// }

// *****    ↑↓  ↑↓  NO CALLBACKS WITH MONGOOSE  ↑↓    ↑↓    *****

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update)
        .then(userUpdated => {
            if (!userUpdated) {
                res.status(404).send({ message: "L'utilisateur à mettre à jour n'existe pas" });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erreur : le profil utilisateur n'a pas été actualisé" });
        });
}


// Penser à exporter la méthode updateUser!!! ↓       ↓       ↓       ↓
// <<< 5.23.1 ACTUALIZAR UN USUARIO > routes/user.js


// 2.24.2>>>  <uploads/users.js 
// function uploadImage(req, res) {
//     // qu'est-ce qu'on va recevoir ? Un userId ```var userId =```,
//     // dans lequel on reçoit les paramètres id de l'url ```= req.params.id;``` :
//     var userId = req.params.id;
//     // une variable pour le nom du fichier au cas où on ne reçoit rien 
//     var file_name = "..Echec du chargement..."; 

//     // Vérifier que quelque chose arrive par files ; le chargement du fichier se fera : 
//     if (req.files) { 
//         // on récupère le nom du fichier avec file_path : 
//         var file_path = req.files.image.path; 
//         // trim 
//         var file_split = file_path.split('\\');
//         var file_name = file_split[2];

//         var ext_split = file_name.split('\.');
//         var file_ext = ext_split[1]; 

//         if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
//             User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
//                 if (!userUpdated) {
//                     res.Status(404).send({ message: 'Echec de la modification de l\'utilisateur' });
//                 } else {
//                     res.status(200).send({ user: userUpdated });
//                 }
//             });           

//         } else {
//             res.status(200).send({ message: "Extension du fichier invalide" });
//         }
        


//         console.log(file_path); 
     
//         // Et sinon : 
//     } else { 
//         res.status(500).send({message: "..Echec : aucune image chargée..."})
        
//     }
// }


async function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = "..Echec du chargement...";

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            try {
                const userUpdated = await User.findByIdAndUpdate(userId, { image: file_name });
                if (!userUpdated) {
                    res.status(404).send({ message: 'Échec de la modification de l\'utilisateur' });
                } else {
                    res.status(200).send({ user: userUpdated });
                }
            } catch (error) {
                res.status(500).send({ message: 'Erreur : le profil utilisateur n\'a pas été actualisé' });
            }
        } else {
            res.status(400).send({ message: 'Extension du fichier invalide' });
        }
    } else {
        res.status(500).send({ message: 'Échec : aucune image chargée' });
    }
}


// <<<22.24.2

// // 2.25.2 CREER UNE METHODE QUI RECUPERE L'IMAGE
// function getImageFile(req, res) {
//     // On récupère le paramètre params qui va être récupéré par l'URL qui
//     // sera imageFile;
//     var imageFile = req.params.imageFile;
//     // ICI : utilisation d'une variable path_file
//     var path_file = './upload/users/' + imageFile;

//     // Vérifier si un fichier existe dans le serveur avec
//     // le file system :
//     fs.exists(path_file, function (exists) {
//     //  ↑ ↑ ↑ fs.exists deprecated ! → use fs.constants.f_OK ?
//         if (exists) {
//             // fs.exists = booléen : si ok : envoi du fichier
//             // sinon : message d'échec
//             // Et : avec l'objet path, on accède à la méthode resolve
//             // Et: on renvoie le fichier qu'on voulait = stocké avec imageFIle
//             res.sendFile(path.resolve(path_file));
//         } else {
//             res.status(500).send({ message: 'Échec : L\'image n\'existe pas' });

//         }
//     })
// }

//      ↑    ↑   ↑   ↑
// // <<< 2.25.2 fs.exists deprecated ! → use fs.constants.f_OK ? >>> 
//      ↓   ↓   ↓   ↓


function getImageFile(req, res) {
    // On récupère le paramètre params qui va être récupéré par l'URL qui 
    // sera imageFile;
    var imageFile = req.params.imageFile;
    // ICI : utilisation d'une variable path_file
    var path_file = './uploads/users/' + imageFile;

    // Vérifier si un fichier existe dans le serveur avec 
    // le file system : 
    // fs.exists(path_file, function (exists) {
     fs.access(path_file, fs.constants.F_OK, (err) => {
    //  ↑ ↑ ↑ fs.exists deprecated ! → use fs.constants.f_OK ? 
         if (!err) {
            // si le fichier existe, on l'envoie ; simple condition
             res.sendFile(path.resolve(path_file));
            //  Sinon, simple message d'erreur :
        } else {
            res.status(500).send({ message: 'Échec : L\'image n\'existe pas' });

        }
    })
}
// <<< 2.25.2 CREER UNE METHODE QUI 
// > routes/user 5.25.3


// <<< Export >>>
module.exports = {
    test,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};