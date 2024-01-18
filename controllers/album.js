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

function getAlbum(req, res) {

    res.status(200).send({ message: 'Action getAlbum' })
    
    
/*
    // Récupération de l'ID de l'Album à partir des paramètres de l'URL
    var albumId = req.params.id;

    // Utilisation de la méthode findById avec une promesse
    Album.findById(albumId)
        .then(album => {
            if (!album) {
                // Aucun albume trouvé avec l'ID donné
                res.status(404).send({ message: "L'albume n'existe pas dans la base de données" });
            } else {
                // Albume trouvé avec succès
                res.status(200).send({ album });
            }
        })
        .catch(err => {
            // Gestion des erreurs
            res.status(500).send({ message: 'Erreur dans la requête', error: err });
        });
        */
}

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

    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({ message: 'Erreur de serveur' });
        } else {
            if (!albumStored) {
                res.status(404).send({ message: 'Erreur : sauvegarde non effectuée ' });
             
            } else {
                // On renvoie ici l'objet albumStored de l'album : 
                res.status(200).send({album: albumStored })
            }
        }
    })
}
// <<<7.34 SALVAR ALBUM >routes/album : créer la route, bien sûr
 

module.exports = {
    getAlbum,
    saveAlbum
}