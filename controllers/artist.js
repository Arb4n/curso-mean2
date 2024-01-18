// 6.26.1>>> 
'use strict'
// Pour travailler avecc le système de fichiers, path et fs → pour upload une image, et renvoyer une image :
const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');

// Importer les classes suivantes 
// !!! MAj, car ces variables représentent des classes (constructeur =mt)
const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');

// function getArtist(req, res) {
//     // >>> 6.28.1>>> Conseguir el artista
//     //D'abord, il faut un getArtist, pour récupérer l'artiste dans la base de données :
//     // Pour cela, on récupère un paramètre qui arrive grâce à l'url ; ici, l'id de l'artiste :
//     var artistId = req.params.id;

//     Artist.findById(artistId, (err, artist) => {
//         if (err) {
//             res.status(500).send({ message: 'Erreur dans la requête' });
//         } else {
//             if (!artist) {
//                 res.status(404).send({ message: 'L\'artiste n\'existe pas dans la base de données' });
//             } else {
//                 res.status(200).send({ artist });
//             }
//         }
//     });
//     // TODO: regarder à quoi ça ressemble en fonction non fléchée
//     // <<<6.28.1 → routes/artist.js
//     res.status(200).send({ message: 'Méthode getArtist du contrôleur artist.js' });
// }

function getArtist(req, res) {
    // Récupération de l'ID de l'artiste à partir des paramètres de l'URL
    var artistId = req.params.id;

    // Utilisation de la méthode findById avec une promesse
    Artist.findById(artistId)
        .then(artist => {
            if (!artist) {
                // Aucun artiste trouvé avec l'ID donné
                res.status(404).send({ message: "L'artiste n'existe pas dans la base de données" });
            } else {
                // Artiste trouvé avec succès
                res.status(200).send({ artist });
            }
        })
        .catch(err => {
            // Gestion des erreurs
            res.status(500).send({ message: 'Erreur dans la requête', error: err });
        });
}

// >>> 6.29.1 >>> Listado de artistas paginado



// Il semble que vous utilisiez la méthode paginate dans votre code, mais il n'est pas directement pris en charge par Mongoose. Cependant, vous pouvez obtenir un résultat similaire en utilisant la méthode skip pour paginer les résultats.

// Dans ce code, j'ai utilisé la méthode skip pour paginer les résultats et la méthode countDocuments pour obtenir le nombre total d'artistes.Ces deux opérations sont effectuées de manière asynchrone à l'aide des promesses pour garantir un code plus lisible et gérer les erreurs de manière appropriée : 

function getArtistList(req, res) {
    // var page = req.params.page;
    // var itemsPerPage = 3; ↓  ↓   ↓

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;
    // Calcul de la valeur à utiliser pour skip
    var skipValue = (page - 1) * itemsPerPage;

    // Utilisation de la méthode find pour récupérer les artistes paginés
    Artist.find().sort('name').skip(skipValue).limit(itemsPerPage)
        .then(artists => {
            // Utilisation de la méthode countDocuments pour obtenir le nombre total d'artistes
            Artist.countDocuments()
                .then(total => {
                    if (!artists || artists.length === 0) {
                        res.status(404).send({ message: "La base de données est vide !!" });
                    } else {
                        res.status(200).send({
                            totalPages: Math.ceil(total / itemsPerPage),
                            artists: artists
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: 'Erreur dans la requête (countDocuments)', error: err });
                });
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur dans la requête (find)', error: err });
        });
}



// function getArtistList(req, res) {
//     var page = req.params.page;
//     var itemsPerPage = 3
//     // utiliser le moduleArtist.méthode find pour sortir tout ce qui est dans l'objet.sort tout ordonner par nom (name).et méthode paginate qui fournit la librairie, on lui passe le numéro de page (page,), et la quantié d''éléments par page (, itemsPerPage ; puis, une fonction de charge avec les params error et artists, qui sera sorti de la bdd,et total, le total d'items récupérés)
//     Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
//         if (err) {
//                     res.status(500).send({ message: 'Erreur dans la requête' });
//                 } else {
//                     if (!artists) {
//                         res.status(404).send({ message: 'L\'artiste n\'existe pas dans la base de données' });
//                     } else {
//                         res.status(200).send({
//                             page: total,
//                             artists: artists
//                         });
//                     }
//                 }
//     })

// }
// function getArtistList(req, res) {
//     var page = req.params.page;
//     var itemsPerPage = 3
//     // utiliser le moduleArtist.méthode find pour sortir tout ce qui est dans l'objet.sort tout ordonner par nom (name).et méthode paginate qui fournit la librairie, on lui passe le numéro de page (page,), et la quantié d''éléments par page (, itemsPerPage ; puis, une fonction de charge avec les params error et artists, qui sera sorti de la bdd,et total, le total d'items récupérés)
//     Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
//          .then(artists => {
//              if (!artists) {
//                  // Aucun artiste trouvé avec l'ID donné
//                  res.status(404).send({ message: "La base de données est vide !!" });
//              } else {
//                  // Artiste trouvé avec succès
//                  res.status(200).send({
//                      pages: total,
//                      artists: artists
//                  });
//              }
//          })
//             .catch(err => {
//                 // Gestion des erreurs
//                 res.status(500).send({ message: 'Erreur dans la requête', error: err });
//             });
//     })

// }
// ne pas oublier le module de pagination mongoose

// const mongoosePaginate = require('mongoose-pagination');
// <<<6.29.1 Listado de artistas paginado  → exmporter la méthode ↓ ↓, faire la route → routes/artist


// >>>6.30.1>>> Actualizar un artista
// ajouté l'option { new: true } à findByIdAndUpdate pour vous assurer que la réponse renvoie l'artiste mis à jour plutôt que l'artiste original. Cette option est facultative, mais elle peut être utile dans certains cas.

// function updateArtist(req, res) {
//     var artistId = req.params.id;
//     var update = req.body;

//     Artist.findByIdAndUpdate(artistId, update, { new: true }, (err, artistUpdated) => {
//         if (err) {
//             res.status(500).send({ message: 'Erreur: échec de la mise à jour de l\'artiste', error: err });
//         } else {
//             if (!artistUpdated) {
//                 res.status(404).send({ message: 'L\'artiste n\'a pas été actualisé' });
//             } else {
//                 res.status(200).send({ artist: artistUpdated });
//             }
//         }
//     });
// }

function updateArtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, { new: true })
        .then(artistUpdated => {
            if (!artistUpdated) {
                res.status(404).send({ message: 'L\'artiste n\'a pas été actualisé' });
            } else {
                res.status(200).send({ artist: artistUpdated });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur: échec de la mise à jour de l\'artiste', error: err });
        });
}


// >>>6.31>>> DELETE
function deleteArtist(req, res) {
    var artistId = req.params.id;

    //     Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
    //         if (err) {
    //             res.status(500).send({ message: 'Erreur dans la requête' });
    //         } else {
    //             if (!artistRemoved) {
    //                 res.status(404).send({ message: 'L\'artiste n\'a pas été effacé' });
    //             } else {
    //                 res.status(200).send({artist: artistRemoved 
    //                 });
    //             }
    //         }

    //     });
    // }
    Artist.findByIdAndRemove(artistId)
        .then(artistRemoved => {
            if (!artistRemoved) {
                res.status(404).send({ message: 'L\'artiste n\'a pas été supprimé' });
            } else {
                res.status(200).send({ artistRemoved });

                // Supprimer tous les albums de l'artiste
                Album.find({ artist: artistRemoved._id }).remove()
                    .then(albumRemoved => {
                        if (albumRemoved) {
                            // Supprimer toutes les chansons des albums supprimés
                            Song.find({ album: albumRemoved._id }).remove()
                                .then(songRemoved => {
                                    if (!songRemoved) {
                                        res.status(404).send({ message: 'La chanson n\'a pas été supprimée' });
                                    } else {
                                        res.status(200).send({ artist: artistRemoved });
                                    }
                                })
                                .catch(err => {
                                    res.status(500).send({ message: 'Erreur: échec de la suppression de la chanson', error: err });
                                });
                        } else {
                            res.status(500).send({ message: 'Erreur: échec de la suppression de l\'album' });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({ message: 'Erreur: échec de la suppression de l\'album', error: err });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur: échec de la suppression de l\'artiste', error: err });
        });

}
// Et comme d'hab, une petite route


// 6.32>>> Upload artist's image

// !!!!!
/*
Your uploadImage function appears to be designed to handle image uploads for an artist. The function checks if a valid image file (with extensions 'png', 'jpg', or 'gif') has been provided. If so, it updates the artist's image field in the database.

Here are a few notes and suggestions:

Error Handling: You are using try-catch for handling errors during the Artist.findByIdAndUpdate operation. This is good practice, but you might want to log or handle the error more specifically to understand the cause of the failure.

File Handling: Your file handling assumes a Windows file path format ('\\'). If your application is deployed on a different operating system (like Unix-based systems), you might encounter issues. Consider using the path module or a cross-platform solution for handling paths.

File Extension Check: The file extension check is case-sensitive. If you want to make it case-insensitive, you can convert file_ext and the allowed extensions to lowercase (or uppercase) before comparison.

Response Status Codes: When an invalid file extension is encountered, you are sending a status of 200. It might be more appropriate to use a different status code (e.g., 400 for Bad Request) to indicate that the client sent an invalid request.

Here's a modified version of your function with some improvements:

javascript
Copy code
const path = require('path'); // Import the path module

async function uploadImage(req, res) {
    var artistId = req.params.id;
    var file_name = "Echec du chargement...";
    
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split(path.sep); // Use path.sep for cross-platform compatibility
        var file_name = file_split[2];
        
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1].toLowerCase(); // Convert to lowercase for case-insensitive comparison
        
        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'gif') {
            try {
                const artistUpdated = await Artist.findByIdAndUpdate(artistId, { image: file_name });
                if (!artistUpdated) {
                    res.status(404).send({ message: 'Échec de la modification de l\'utilisateur' });
                } else {
                    res.status(200).send({ artist: artistUpdated });
                }
            } catch (error) {
                console.error(error); // Log the error for debugging
                res.status(500).send({ message: 'Erreur : le profil utilisateur n\'a pas été actualisé' });
            }
        } else {
            res.status(400).send({ message: 'Extension du fichier invalide' });
        }
    } else {
        res.status(500).send({ message: 'Échec : aucune image chargée' });
    }
}
Remember to handle file paths in a way that is compatible with different operating systems, and adjust the response status codes based on the semantics of the operation. 
*/


// TODO : UPDATE IMAGE INSTEAD OF ADDING 
async function uploadImage(req, res) {
    var artistId = req.params.id;
    var file_name = "Echec du chargement...";
    
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];
        
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            try {
                const artistUpdated = await Artist.findByIdAndUpdate(artistId, { image: file_name });
                if (!artistUpdated) {
                    res.status(404).send({ message: 'Échec de la modification de l\'utilisateur' });
                } else {
                    res.status(200).send({ artist: artistUpdated });
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
// <<<6.32 Upload artist's image 
// > Section 7 - 7.33


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
    var path_file = './uploads/artists/' + imageFile;

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


// 6.27.1>>>
function saveArtist(req, res) {
    var artist = new Artist();
    // Assigner des valeurs à chacune des propriété de artist, = l'information de chaque artiste qui sera sauvegardé
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null'  // null car on n'a pas d'image qui arrive pour le moment, sinon → // params.image

    // Depreciated : no longer accepts callbacks, of course 
    //     artist.save((err, artistStored) => {
    //         if (err) {
    //             res.status(500).send({ message: "Erreur pendant la sauvegarde de l'artiste" });
    //         } else {
    //             if (!artistStored) {
    //                 res.status(404).send({message: "Erreur : Echec de la sauvegarde de l'artiste"})
    //             } else {
    //                 res.status(200).send({ artist: artistStored });
    //             }
    //         }
    //     })
    // }
    //  ↓       ↓       ↓       ↓       ↓   ↓   

    artist.save()
        .then(artistStored => {
            if (!artistStored) {
                res.status(404).send({ message: "Erreur : Echec de la sauvegarde de l'artiste" });
            } else {
                res.status(200).send({ artist: artistStored });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erreur pendant la sauvegarde de l'artiste", error: err });
        });

}
// <<< 6.27.1  → routes/artist.js

module.exports = {
    getArtist,
    getArtistList,
    saveArtist,
    updateArtist,
    deleteArtist,
    getImageFile,
    uploadImage
};
// <<<6.26.1 > routes/artist