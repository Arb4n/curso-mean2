// 8.40>>> CONTROLADOR DE CANCIONES >>>

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

// function getSong(req, res) {
//     res.status(200).send({ message: 'Contrôleur chanson' })
// }


// 8.41>>>  Acción para crear canciones dentro de un album 


function saveSong(req, res) {
    var song = new Song();

    var params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album; // on récupère les id de album pour pouvoir obtenir ses infos et 'populate' les données de la chanson, et savoir à quel album elle est associée. 

    song.save()
        .then(songStored => {
            if (!songStored) {
                res.status(404).send({ message: "Erreur : Echec de la sauvegarde de la chanson" });
            } else {
                res.status(200).send({ song: songStored });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erreur serveur", error: err });
        });

}

// <<<8.41  Acción para crear canciones dentro de un album >routes/song : création de route, de type post

// S8.42>>> - GET SONG - http://localhost:3977/api/song
// FONCTIONNE ::>>>
// function getSong(req, res) {
//     // Récupération de l'ID de la chanson à partir des paramètres de l'URL
//     var songId = req.params.id;

//     // Utilisation de la méthode findById avec une promesse
//     Song.findById(songId).populate({path: 'album'})
//         .then(song => {
//             if (!song) {
//                 // Aucune chanson trouvé avec l'ID donné
//                 res.status(404).send({ message: "La chanson n'existe pas dans la base de données" });
//             } else {
//                 // Chanson trouvée avec succès
//                 res.status(200).send({ song });
//             }
//         })
//         .catch(err => {
//             // Gestion des erreurs
//             res.status(500).send({ message: 'Erreur dans la requête', error: err });
//         });
// }

// function getSong(req, res) {
//     var songId = req.params.id;

//     Song.findById(songId)
//         .populate({ path: 'album' })
//         .exec((err, song) => {
//             if (err) {
//                 res.status(500).send({ message: 'Erreur dans la requête', error: err });
//             } else {
//                 if (!song) {
//                     res.status(404).send({ message: 'La chanson n\'existe pas!' });
//                 } else {
//                     res.status(200).send({ song });
//                 }
//             }
//         });
// }

function getSong(req, res) {
    var songId = req.params.id;

    Song.findById(songId)
        .populate({ path: 'album' })
        // .exec()
        .then(song => {
            if (!song) {
                res.status(404).send({ message: 'La chanson n\'existe pas!' });
            } else {
                res.status(200).send({ song });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur dans la requête', error: err });
        });
}


// <<<8.42 - GET SONG - http://localhost:3977/api/song

// 8.43>>> GET SONGS LIST

function getSongs(req, res) {
    var songId = req.params.song;
    if (!songId) {
        // Obtenir toutes les chansons de la base de données
        var find = Song.find({}).sort('number');
    } else {
        // obtenir les albums d'un artist donné dans la BDD
        // ils sont classés par année, à partir de l'album le plus récent 
        var find = Song.find({ song: songId }).sort('number');
    }
    find.populate({ path: 'album', populate: { path: 'artist', model: 'Artist' } }).then(songs => { // !!! il faut aussi populer à l'intérieur, 'nested population', pour récupérer les informations artist dans album
        // NOT SO GOOD : AN ARRAY CANNOT BE FALSY ; !albums checks that
        // if (!albums) {
        //     res.status(404).send({ message: 'Il n\'y a pas d\'albums' });
        // } else {
        //     res.status(200).send({ albums });
        // }
        // RATHER DO : ↓        ↓
        if (songs.length === 0) {
            res.status(404).send({ message: 'Il n\'y a pas de chanson' });
        } else {
            res.status(200).send({ songs });
        }

    })
        .catch(err => {
            res.status(500).send({ message: 'Erreur dans la requête', error: err });
        });
}
// TODO : vérifier si on ne peut pas renvoyer la liste de tous les albums avec un simple : 'http://localhost:3977/api/albums'

// <<<8.43 GET SONGS LIST

// 8.44>>> UPDATE SONG

function updateSong(req, res) {
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, { new: true })
        .then(songUpdated => {
            if (!songUpdated) {
                res.status(404).send({ message: 'Echec: la chanson n\'existe pas' });
            } else {
                res.status(200).send({ song: songUpdated });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur serveur', error: err });
        });
}

// <<<8.44 UPDATE SONG >routes/song

// 8.45>>> DELETE SONG

function deleteSong(req, res) {
    var songId = req.params.id;

    Album.findByIdAndRemove(songId)
        .then(songRemoved => {
            if (!songRemoved) {
                res.status(404).send({ message: 'Echec: La chanson n\'a pas été supprimée' });
            } else {
                res.status(200).send({ songRemoved });

                // Supprimer tous les albums de l'album
                Song.find({ song: songRemoved._id }).remove()
                    .then(songRemoved => {
                        if (songRemoved) {
                            // Supprimer toutes les chansons des albums supprimés
                            Song.find({ album: songRemoved._id }).remove()
                                .then(songRemoved => {
                                    if (!songRemoved) {
                                        res.status(404).send({ message: 'La chanson n\'a pas été supprimée' });
                                    } else {
                                        res.status(200).send({ song: songRemoved });
                                    }
                                })
                                .catch(err => {
                                    res.status(500).send({ message: 'Erreur: échec de la suppression de la chanson', error: err });
                                });
                        } else {
                            res.status(500).send({ message: 'Erreur: échec de la suppression de la chanson' });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({ message: 'Erreur: échec de la suppression de la chanson', error: err });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erreur: échec de la suppression de la chanson', error: err });
        });

}

// <<<8.45 DELETE SONG >routes/song

// 8.46>>> UPLOAD SONG

async function uploadSongFile(req, res) {
    var songId = req.params.id;
    var file_name = "Echec du chargement...";

    if (req.files) {
        var file_path = req.files.songFile.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        if (file_ext == 'ogg' || file_ext == 'mp3' || file_ext == 'wma') {
            try {
                const songUpdated = await Song.findByIdAndUpdate(songId, { songFile: file_name });
                if (!songUpdated) {
                    res.status(404).send({ message: 'Échec de la modification du fichier' });
                } else {
                    res.status(200).send({ song: songUpdated });
                }
            } catch (error) {
                res.status(500).send({ message: 'Erreur : le fichier ne s\'est pas chargé' });
            }
        } else {
            res.status(400).send({ message: 'Extension du fichier invalide' });
        }
    } else {
        res.status(500).send({ message: 'Échec : aucune image chargée' });
    }
}

function getSongFile(req, res) {
    // On récupère le paramètre params qui va être récupéré par l'URL qui 
    // sera imageFile;
    var songFile = req.params.songFile;
    // ICI : utilisation d'une variable path_file
    var path_file = './uploads/songs/' + songFile;

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
            res.status(500).send({ message: 'Échec : Le fichier n\'existe pas' });

        }
    })
}
// <<<8.46 UPLOAD SONG

module.exports = {
    getSong,
    getSongs,
    saveSong,
    updateSong,
    deleteSong,
    uploadSongFile,
    getSongFile
}

// <<<8.40 CONTROLADOR DE CANCIONES > /routes/song
