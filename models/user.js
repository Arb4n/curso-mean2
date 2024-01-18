// 4.15.1>>>: création de user
// ↓ ne jamais oublier ↓
'use strict'

// ↓ Pour accéder à la BDD : ↓ 
const mongoose = require('mongoose');
// ↓ Variable : Permet de définir un schéma de la BDD ↓ 
// Une collection concrète va étre créée, 
// et un document condret dans cette collection
const Schema = mongoose.Schema;

// ↓    Un schéma pour le modèle utilisateur /user  ↓
const UserSchema = Schema({
    name: String, 
    surname: String, 
    email: String, 
    password: String, 
    role: String, 
    image: String 
//  ↑ pas d'autre champ, id, etc. : Mongodb l'ajoute automatiquement
})

// 4.15.2>>> : Pour pouvoir utiliser l'objet en dehors
// ↓   de ce fichier, il va falloir l'exporter : ↓
module.exports = mongoose.model('User', UserSchema);

// <<< 4.15.00 > 4.16.00 > artist.js