// 8.40>>> CONTROLADOR DE CANCIONES <controllers/song 

'use strict'

const express = require('express');
const SongController = require('../controllers/song');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/songs' });

// 8.42>>> Compléter la route avec l'id : '/song' → 'song/:id' <<<8.42
api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/song/:album?', md_auth.ensureAuth, SongController.getSongs);
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.put('/song', md_auth.ensureAuth, SongController.updateSong);


// export de la méthode de l'api 
module.exports = api;
// test : d'abord se login ;
// puis copier le token

//  > app.js : charger la route
// <<<8.40 CONTROLADOR DE CANCIONES >/app.js
