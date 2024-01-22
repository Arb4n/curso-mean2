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

// function getalbum(req, res) {
//     // >>> 6.28.1>>> Conseguir el albuma
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


// 7.35>>> DEVOLVER ALBUM

// function getAlbum(req, res) {
//     var albumId = req.params.id;

//     // The populate method in Mongoose is used to replace specified paths in a document with documents from other collections.
//     // It's a way to "populate" references in a document with the actual referenced documents. This is useful when you have relationships between different types of data stored in separate collections.
//     // Here's a basic example:
//     // Suppose you have two models, Author and Book, where a Book document has a reference to an Author.
//     // Without using populate, if you query for a book, you might only get the author's _id, and you would need to make an additional query to get the full author details. populate simplifies this process.

//     // populate va chercher des informations dans un autre modèle, 'artist' ; 'path' indique la route; exec lance le script de findById
//     Album.findById(albumId).populate({ path: 'artist' }).exec((err, album) => {
//         if (err) {
//             res.status(500).send({ message: 'Erreur dans la requête', error: err });
//         } else {
//             if (!album) {
//                 res.status(404).send({ message: 'L\'album n\'existe pas' });
//             } else {
//                 res.status(200).send({ album });
//             }
//         }
//     });
// }

function getAlbum(req, res) {
    var albumId = req.params.id;

    // The populate method in Mongoose is used to replace specified paths in a document with documents from other collections.
    // It's a way to "populate" references in a document with the actual referenced documents. This is useful when you have relationships between different types of data stored in separate collections.
    // Here's a basic example:
    // Suppose you have two models, Author and Book, where a Book document has a reference to an Author.
    // Without using populate, if you query for a book, you might only get the author's _id, and you would need to make an additional query to get the full author details. populate simplifies this process.

    // populate va chercher des informations dans un autre modèle, 'artist' ; 'path' indique la route; exec lance le script de findById
    Album.findById(albumId).populate({ path: 'artist' })
        .then(album => {
            if (!album) {
                res.status(404).send({ message: 'L\'album n\'existe pas' });
            } else {
                res.status(200).send({ album });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur dans la requête', error: err });
        });
}

// <<<7.35 DEVOLVER ALBUM

// 7.36>>> MOSTRAR ALBUMS

function getAlbums(req, res) {
    var artistId = req.params.artist;
    if (!artistId) {
        // Obtenir tous les albums de la base de données
    } else {
        // obtenir les albums d'un artist donné dans la BDD
        // ils sont classés par année, à partir de l'album le plus récent 
        var find = Album.find({ artist: artistId }).sort('year');
    }
    find.populate({ path: 'artist' }).then(albums => {
        // NOT SO GOOD : AN ARRAY CANNOT BE FALSY ; !albums checks that
        // if (!albums) {
        //     res.status(404).send({ message: 'Il n\'y a pas d\'albums' });
        // } else {
        //     res.status(200).send({ albums });
        // }
        // RATHER DO : ↓        ↓
        if (albums.length === 0) {
            res.status(404).send({ message: 'Il n\'y a pas d\'albums' });
        } else {
            res.status(200).send({ albums });
        }

    })
        .catch(err => {
            res.status(500).send({ message: 'Erreur dans la requête', error: err });
        });
}
// TODO : vérifier si on ne peut pas renvoyer la liste de tous les albums avec un simple : 'http://localhost:3977/api/albums'
// <<<7.36 MOSTRAR ALBUMS


/*
// Récupération de l'ID de l'Album à partir des paramètres de l'URL
var albumId = req.params.id;
 
// Utilisation de la méthode findById avec une promesse
Album.findById(albumId)
.then(album => {
    if (!album) {
        // Aucun album trouvé avec l'ID donné
        res.status(404).send({ message: "L'album n'existe pas dans la base de données" });
    } else {
        // album trouvé avec succès
        res.status(200).send({ album });
    }
})
.catch(err => {
    // Gestion des erreurs
    res.status(500).send({ message: 'Erreur dans la requête', error: err });
});
*/


// 7.34>>> SALVAR ALBUM
function saveAlbum(req, res) {
    var album = new Album();
    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.image = 'null';
    album.artist = params.artist;

    // album.save((err, albumStored) => {
    //     if (err) {
    //         res.status(500).send({ message: 'Erreur de serveur' });
    //     } else {
    //         if (!albumStored) {
    //             res.status(404).send({ message: 'Erreur : sauvegarde non effectuée ' });

    //         } else {
    //             // On renvoie ici l'objet albumStored de l'album : 
    //             res.status(200).send({album: albumStored })
    //         }
    //     }
    // })
    // Comme d'hab, utilise des promesses : 

    album.save()
        .then(savedAlbum => {
            res.status(200).send({ album: savedAlbum });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error saving the album', error: err });
        });

}
// <<<7.34 SALVAR ALBUM >routes/album : créer la route, bien sûr

// 7.37>>> ACTUALIZAR ALBUM
// function updateAlbum(req, res) {
//     var albumId = req.params.id;
//     var update = req.body;
    
//     Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
//         if (err) {
//             res.status(500).send({ message: 'Erreur serveur' });
//         } else {
//             res.status(200).send({ album: albumUpdated});
//         }
//     })
// }

function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, { new: true })
        .then(albumUpdated => {
            if (!albumUpdated) {
                res.status(404).send({ message: 'L\'album n\'existe pas' });
            } else {
                res.status(200).send({ album: albumUpdated });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur serveur', error: err });
        });
}
// <<<7.37 ACTUALIZAR ALBUM

// 7.38>>> DELETE ALBUM
function deleteAlbum(req, res) {
    var albumId = req.params.id;
    
    Album.findByIdAndRemove(albumId)
        .then(albumRemoved => {
            if (!albumRemoved) {
                res.status(404).send({ message: 'L\'album n\'a pas été supprimé' });
            } else {
                res.status(200).send({ albumRemoved });

                // Supprimer tous les albums de l'album
                Album.find({ album: albumRemoved._id }).remove()
                    .then(albumRemoved => {
                        if (albumRemoved) {
                            // Supprimer toutes les chansons des albums supprimés
                            Song.find({ album: albumRemoved._id }).remove()
                                .then(songRemoved => {
                                    if (!songRemoved) {
                                        res.status(404).send({ message: 'La chanson n\'a pas été supprimée' });
                                    } else {
                                        res.status(200).send({ album: albumRemoved });
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
            res.status(500).send({ message: 'Erreur: échec de la suppression de l\'album', error: err });
        });

}


// 7.39>>> SAVE AND UPDATE IMAGE

async function uploadImage(req, res) {
    var albumId = req.params.id;
    var file_name = "Echec du chargement...";

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            try {
                const albumUpdated = await Album.findByIdAndUpdate(albumId, { image: file_name });
                if (!albumUpdated) {
                    res.status(404).send({ message: 'Échec de la modification de l\'utilisateur' });
                } else {
                    res.status(200).send({ album: albumUpdated });
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


function getImageFile(req, res) {
    // On récupère le paramètre params qui va être récupéré par l'URL qui 
    // sera imageFile;
    var imageFile = req.params.imageFile;
    // ICI : utilisation d'une variable path_file
    var path_file = './uploads/albums/' + imageFile;

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

// TODO : mettre la méthode image à part ? 

// <<<7.39 SAVE AND UPDATE IMAGE >routes/album

// <<<7.38 DELETE ALBUM > routes/album

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}