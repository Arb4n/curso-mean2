// 11.58>>> CREER DES SERVICES
import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http'; // All deprecated -> https://pixel-tones.com/angular-http-deprecated/
//TODO? replace by : httpClientModule? TODO
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    // 11.61 >>> METHODE DE LOGIN DANS LE SERVICE UTILISATEURS 
    // signUp(user_to_login, getHash = null) {
    signUp(user_to_login, getHash = null): Observable<any> {
        // return "Hello, test du service"
        if (getHash != null) {
            user_to_login.getHash = getHash
        }
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http.post(this.url + 'login', params, { headers: headers })
            // .map(res => res.json());
            .pipe(map((response: any) => response.json()));
    } // On va ensuite appeler le service depuis un component >app.component.ts
    // <<<11.61 METHODE DE LOGIN DANS LE SERVICE UTILISATEURS > app.component.ts
}

// <<<11.58 CREER DES SERVICES >services/global.ts
