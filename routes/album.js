// SECTION 7>>> CONTROLADOR DE ALBUM
// 7.33.1>>>
'use strict'

const express = require('express');
const AlbumController = require('../controllers/album');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/album' });

// route de test, avec la route album → avec la méthode ensureAuth
// >>> 6.28.2>>> routes/album.js ← 
// Compléter la route avec l'id : '/album' → 'album/:id' <<<6.28.2
api.get('/album', md_auth.ensureAuth, AlbumController.getAlbum);
// 7.34>>> SALVAR ALBUM <controllers/album
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
// <<<7.34 SALVAR ALBUM

// export de la méthode de l'api 
module.exports = api;
// test : d'abord se login ;
// puis copier le token

//  > app.js : charger la route