// 231023
// > controller/user.js
// 5.21.1 Creation de services/jwt.js ↓         ↓ 

'use strict'

// import de jwt 
// const jwt = require('jsonwebtoken');

const jwt = require('jwt-simple');
// moment : vient de la librairie node  ↓       ☻      ↓
// moment est une bibliothèque JavaScript très populaire
// pour la manipulation des dates et du temps.Avec moment, vous pouvez effectuer des opérations telles que la création de dates, la modification de dates existantes, le formatage des dates, le calcul de différences entre dates, etc.
// permet de mettre en place une date d'expiration du token ; une fois expiré, 
// il faut se relogger
const moment = require('moment');

// !!>>> ne pas oublier d'amorcer la variable 'secret' pour hasher l'objet 
const secret = 'secret_key_curso_mean2'; 

// export et réation d'une méthode exports.createtoken, on va lui passer le param de user :
// cet objet va prendre toutes les données utilisteur et les enregistrer dans la codification 
// d'un token ; le code va être gardé dans un hash : 
exports.createToken = function (user) {
    const payload = {
        // propriété sub, pour conserver l'id du registre ou l'id de la bdd ; 
        // dans ce cas, de l'id de la bdd de user : 
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        // pour accéder aux propriétés déjà remplies dans l'objet user
        role: user.role,
        image: user.image,
        // format : unix    ↓
        // iat = "issued at" = temps d'émission du jeton ↓
        iat: moment().unix(),
        // expiration : tous les 30 jours 
        exp: moment().add(30, 'days').unix()
    };
   
    // secret : clef secrete pour faire le hash qui sera généré
    // la clef secret sera utilisée pour 'hasher' l'objet 'payload'
    return jwt.encode(payload, secret);

};
// >5.21.2> controllers/user.js