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

function getSong(req, res) {
res.status(200).send({message: 'COntrôleur chanson'})
}


// 8.41>>>  Acción para crear canciones dentro de un album 


function saveSong(req,res){
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
function getSong(req, res) {
    // Récupération de l'ID de la chanson à partir des paramètres de l'URL
    var songId = req.params.id;

    // Utilisation de la méthode findById avec une promesse
    Song.findById(songId).populate({path: 'album'})
        .then(song => {
            if (!song) {
                // Aucune chanson trouvé avec l'ID donné
                res.status(404).send({ message: "La chanson n'existe pas dans la base de données" });
            } else {
                // Chanson trouvée avec succès
                res.status(200).send({ song });
            }
        })
        .catch(err => {
            // Gestion des erreurs
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
    find.populate({ path: 'album', populate: {path: 'artist', model: 'Artist'} }).then(songs => { // !!! il faut aussi populer à l'intérieur, 'nested population', pour récupérer les informations artist dans album
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



module.exports = {
    getSong,
    getSongs, 
    saveSong
}

// <<<8.40 CONTROLADOR DE CANCIONES > /routes/song
