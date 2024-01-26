// < controller/artist
// 6.26.2>>>
'use strict'

const express = require('express');
const ArtistController = require('../controllers/artist'); 
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

// 6.32>>>
const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/artists' });
// <<<6.32

// route de test, avec la route artist → avec la méthode ensureAuth
// >>> 6.28.2>>> routes/artist.js ← 
// Compléter la route avec l'id : '/artist' → 'artist/:id' <<<6.28.2
api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
// >>>6.29.2>>> controller/artist ← 
// '?' = la méthode page va être optionnelle, car il est possible qu'elle soit absente
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtistList);
// 6.27.2>>>  controller/artist.js ←
// On garde 'md_auth.ensureAuth', pour ^pouvoir se login, et saveArtist: 
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
// → Postman>>> POST  url/api/artist
// → headers /authorization>>> coller token de login ; o x-www-form-urlencoded >>> name, description, image
// 6.30.2 méthode put
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
// 6.32>>>
api.post('/upload-image-artist/:id', [md_auth.ensureAuth,
    // ICI >>> on utilise aussi le middleware md_upload
    md_upload], ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile);

    // <<<6.32
    
// <<<6.27.2  
// export de la méthode de l'api 
module.exports = api; 
// test : d'abord se login ;
// puis copier le token

// <<<6.26.2 > app.js : charger la route