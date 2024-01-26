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
// 8.40>>> CONTROLADOR DE CANCIONES <controllers/song <routes/song
const song_routes = require('./routes/song');
// <<<8.40 CONTROLADOR DE CANCIONES

// Configurer des dépendances  : 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ↑            ↑           ↑
// traduit en données json les données transmises par les requetes http

// configurer les en-t^te http
// 9.47>>> CONFIGURAR CABECERAS HTTP CORS 
// Ce que reçoit le middleware est : une request, une response, et un next, qui permet de sortir du middleware pour passer à autre chose
app.use((req,res, next) => {
    // configurer l'en-tête header: 
    res.header('Access-Control-Allow-Origin', '*'); // -> on permet l'accès de notre api à tous les domaines
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); // En-têtes nécessaires pour que l'api fonctionne au niveau de .?.  
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    // Pour qu'on sorte du middleware ci-dessu et continue le flux normal d'exécution, une route concrète, une méthode d'un contrôleur, etc. -> méthode next() : 
    next(); 
});

// !!!>>> Pourquoi 'req' = non utilisé ?  <<<!!!
// <<<9.47 CONFIGURAR CABECERAS HTTP CORS - END > 9.48 >controllers/user


// routes base
// 5.18.3>>>
app.use('/api', user_routes); 
// <<<5.18.3
// 6.26.4>>> 
// Charger la route grâce au middleware express : 
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);

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
