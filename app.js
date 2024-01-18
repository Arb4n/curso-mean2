// 4.14.1>>> Création du fichier app.js

'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Charger les routes : il n'y en a aucune pour le moment
// >routes>user.js> 5.18.2>>>
const user_routes = require('./routes/user');
// <<<5.18.2
// 6.26.3 >>>  <routes/artist
const artist_routes = require('./routes/artist');
// <<<6.26.3 ↓ routes base 
// 7.33>>>
const album_routes = require('./routes/album');
// <<<7.33
// Configurer des dépendances  : 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ↑            ↑           ↑
// traduit en données json les données transmises par les requetes http

// configurer les en-t^te http

// routes base
// 5.18.3>>>
app.use('/api', user_routes); 
// <<<5.18.3
// 6.26.4>>> 
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);

// 4.14.3 >>> définition des routes
// route vers /test; function() de chargement
// fonction de chargement va recevoir une requete (req)
// et une response (., res)
// app.get('/test', function (req, res) {
//     res.status(200).send({ message: 'Bienvenido principesse ! O al curso de victorroblesweb.es lol' });
// }); 
// <<< 4.14 >   4.15.00 > user.js

// export du module : 
module.exports = app; 
//  ↑       ↑       ↑
// permet d'utiliser express
// dans n'importe quel dossier qui incult app
// 
