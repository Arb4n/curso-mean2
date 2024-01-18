//  5.18.1>>> Création du controleur user ↓ 
'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

// 5.22.**      ↓           ↓           ↓
const md_auth = require('../middlewares/authenticated');

// >>>2.24.1>>> connect-multiparty permet d'avoir un middleware qui permet
        // de trvailler avec le chargement de fichiers.  
const multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});
        // <<<2.24.1 > controlers/user.js


        // 5.22.**      ↓           ↓           ↓
api.get('/test-controller', md_auth.ensureAuth, UserController.test);
api.post('/register', UserController.saveUser);
// <<<5.22.**      

// <controllers>user.js> 5.20.2>>> Définir la route : 
api.post('/login', UserController.loginUser);
// <<<5.20.2 > !!!>>> ne pas oublier d'exporter loginUser dans le controleur !!! !!!>>>
// Encore erreur de callback non prise en compte  :  ```Model.findOne() no longer accepts a callback```

//  <controllers/user.js< 5.23.2>>>
// Ajout de la route 'put' : sert à actualiser les données/ ressources de la bdd    ↓      ↓
// l'api va avoir une path /update-user/, qui va recevoir un id . un id OBLIGATOIRE
    // Si on veut qu'il soit optionnel : '/update-user/:id?' ; on ajoute un ?
api.put('/update-user/:id',
    // On va requérir que l'utilisateur soit authentifié :
    // le passage de l'id dans l'URL pourrait être optionnel, étant déjà enregistré dans le token ; 
    // mais si jamais on veut actualiser un utilisateur différent, ça n'irait pas  
    // On vérifie aussi que l'utilisateur est bien identifié = token correct
    md_auth.ensureAuth,
    // Et on appelle la méthode  : 
    UserController.updateUser);  
    
    // <<<<5.23.2
    // >>>5.24.3>>>
    api.post('/upload-image-user/:id',
    // On va requérir que l'utilisateur soit authentifié :
    // le passage de l'id dans l'URL pourrait être optionnel, étant déjà enregistré dans le token ; 
    // mais si jamais on veut actualiser un utilisateur différent, ça n'irait pas  
    // On vérifie aussi que l'utilisateur est bien identifié = token correct
        [md_auth.ensureAuth,
    
        // ICI >>> on utilise aussi le middleware md_upload
        md_upload],
    // Et on appelle la méthode  : 
    UserController.uploadImage);  
    
    // <<<5.24.3

// 5.25.3>>>
api.get('/get-image-user/:imageFile', UserController.getImageFile);
// <<<5.25.3



// api.get('/test-controller', function (req, res) {
//     res.status(200).send({ message: 'Bienvenido principesse ! O al curso de victorroblesweb.es lol' });
// });

// 

module.exports = api; 
// <<< 5.18.1.00 > 4.18.2 > app.js


