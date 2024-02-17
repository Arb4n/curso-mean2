// 11.58>>> CREER DES SERVICES
import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http'; // All deprecated -> https://pixel-tones.com/angular-http-deprecated/
//TODO? replace by : httpClientModule? TODO
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/oprerator/map'; problématique dans des versions récentes
// ↓    ↓    ↓ 
import { map } from 'rxjs/operators'; // = pipeable operator ? 

// import { Observable } from 'rxjs/Observable'; // ... NOT ↓  ↓ 
import { Observable } from 'rxjs';
// >global.ts : importer ce fichier global.ts ; './' car dans le même dossier
import { GLOBAL } from './global';

@Injectable()
export class UserService {
    public url: string;
    // Assigner une valeur à la propriété url en chargeant ce service -> constructeur : 
    // _http intègre la dépendance
    constructor(private _http: HttpClient) {
        // la variable GLOBAL a une propriété url, dont on va stocker la valeur dans la nouvelle propriété .url
        // = pouvoir utiliser la nouvelle .url disponible pour l'utiliser dans toute la classe
        this.url = GLOBAL.url;
    }
    // test de la méthode avec la méthode signUp: 
    signUp() {
        return "Hello, test du service"
    } // On va ensuite appeler le service depuis un component >app.component.ts
}

// <<<11.58 CREER DES SERVICES >services/global.ts
