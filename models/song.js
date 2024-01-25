// 4.16.5>>>: création de album.js
// ↓ ne jamais oublier ↓
'use strict'

// ↓ Pour accéder à la BDD : ↓ 
const mongoose = require('mongoose');
// ↓ Variable : Permet de définir un schéma de la BDD ↓ 
// Une collection concrète va étre créée, 
// et un document condret dans cette collection
const Schema = mongoose.Schema;

// ↓    Un schéma pour le modèle utilisateur /user  ↓
const SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album' }


    //  ↑ pas d'autre champ, id, etc. : Mongodb l'ajoute automatiquement
})

// 4.16.6>>> : Pour pouvoir utiliser l'objet en dehors
// ↓   de ce fichier, il va falloir l'exporter : ↓
module.exports = mongoose.model('Song', SongSchema);

// <<< 4.16.00 > 4.17.00 > Section 5