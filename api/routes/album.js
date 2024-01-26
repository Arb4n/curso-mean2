// SECTION 7>>> CONTROLADOR DE ALBUM
// 7.33.1>>>
'use strict'

const express = require('express');
const AlbumController = require('../controllers/album');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/albums' });

// route de test, avec la route album → avec la méthode ensureAuth
// >>> 6.28.2>>> routes/album.js ←
api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum); // Compléter la route avec l'id : '/album' → 'album/:id' <<<6.28.2
// 7.35>>> Ajouté '/:id' 7.35<<<
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);
// 7.34>>> SALVAR ALBUM <controllers/album
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
// <<<7.34 SALVAR ALBUM

// 7.37>>> ACTUALIZAR ALBUM <controllers/album
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
// <<<7.37 ACTUALIZAR ALBUM

// 7.38>>> DELETE ALBUM > routes/album
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
// <<<7.38 DELETE ALBUM

// 7.39>>> SAVE AND UPDATE IMAGE <controllers/album
api.post('/upload-image-album/:id', [md_auth.ensureAuth,
    // ICI >>> on utilise aussi le middleware md_upload
    md_upload], AlbumController.uploadImage);
api.get('/get-image-album/:imageFile', AlbumController.getImageFile);

// <<<7.39 SAVE AND UPDATE IMAGE 

// export de la méthode de l'api 
module.exports = api;
// test : d'abord se login ;
// puis copier le token

//  > app.js : charger la route