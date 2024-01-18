'use strict'

const jwt = require('jwt-simple');
const moment= require('moment');
const secret = 'secret_key_curso_mean2';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "la demande effectuée n'inclut pas l'en-tête d'authentification attendu" })
        
    }
    // var à utiliser ici à cause de la portée de ce type de variable ; 
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Le token a expiré' });
            
        }
    } catch (ex) {
        console.log(ex);
        return res.status(404).send({message: 'token invalide'})
    }
    req.user = payload; 
    
    next();
};