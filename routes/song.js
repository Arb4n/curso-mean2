// 8.40>>> CONTROLADOR DE CANCIONES <controllers/song 

'use strict'

const express = require('express');
const SongController = require('../controllers/song');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/songs' });

api.get('/song/:id', md_auth.ensureAuth, SongController.getSong); // 8.42>>> Compléter la route avec l'id : '/song' → 'song/:id' <<<8.42

api.get('/song/:album?', md_auth.ensureAuth, SongController.getSongs);
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.put('/song', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, AlbumController.deleteSong);
// 8.46>>> SAVE AND UPDATE SONG <controllers/song
api.post('/upload-file-song/:id', [md_auth.ensureAuth,
    // ICI >>> on utilise aussi le middleware md_upload
    md_upload], SongController.uploadSongFile);
api.get('/get-file-song/:songFile', SongController.getSongFile);
// <<<8.46 SAVE AND UPDATE SONG - END > 9.47 >/app.js


// export de la méthode de l'api 
module.exports = api;
// test : d'abord se login ;
// puis copier le token

//  > app.js : charger la route
// <<<8.40 CONTROLADOR DE CANCIONES >/app.js
