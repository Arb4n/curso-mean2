// 4.16.3>>>: création de album.js
// ↓ ne jamais oublier ↓
'use strict'

// ↓ Pour accéder à la BDD : ↓ 
const mongoose = require('mongoose');
// ↓ Variable : Permet de définir un schéma de la BDD ↓ 
// Une collection concrète va étre créée, 
// et un document condret dans cette collection
const Schema = mongoose.Schema;

// ↓    Un schéma pour le modèle utilisateur /user  ↓
const AlbumSchema = Schema({
    title: String,
    image: String,
    description: String,
    year: Number, 
    // Une référence à un autre objet ↓ ↓ 
    artist: {type: Schema.ObjectId, ref: 'Artist'}
   
    //  ↑ pas d'autre champ, id, etc. : Mongodb l'ajoute automatiquement
})

// 4.16.4>>> : Pour pouvoir utiliser l'objet en dehors
// ↓   de ce fichier, il va falloir l'exporter : ↓
module.exports = mongoose.model('Album', AlbumSchema);

// <<< 4.16.00 > 4.16.5 > song.js  