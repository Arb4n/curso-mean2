import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { User } from './models/user'; // 11.55 

@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  // 11.55>>> COMPONENTE PRINCIPAL Y VISTA>>> <src/index.html
  // >app.component.ts
  // >app.component.html
  // styleUrl: './app.component.css' -> ne sera pas utilisé 
})
export class AppComponent {
  // title = 'MUSIFY';
  // ↓    ↓     ↓ 
  public title = 'MUSIFY';
  // Puis, propriété user, qui va être de type user, et de quoi envoyer un objet complet à l'api
  public user: User = new User(''); // il faut importer le modèle user, bien sûr, ou le compilateur dira que la prpriété user n'existe pas
  // !!!>>> property 'user' has no initializer and is not definitely assigned in the constructor. -> ajout de User = new User('') + go to user.ts & add '?' =  If you don't have values for some properties at the time of creation, consider making those properties optional in the constructor by adding a '?'
  public identity: User | null = null; // Assuming identity is of type User or can be null
  // pour tester les données de l'utilisateur connecté :
  // tout l'objet user est identifié dedans, -> quand le login est fait dans le local storage, un objet identity est sauvegardé = au moment du chargement du composant, la première chose que fait l'app  
  public token: User | null = null; // le token pour passer le service
  
  // Le constructeur : assigne une valeur à une propriété de la classe 
  // par défaut, on donne donc une valeur à la propriété user
  // On crée dans la propriété user un objet User avec sa propriété initialisée vide
  constructor() {
    this.user = new User('','','','','','ROLE_USER', ''); //On a un objet User vide, qui sera rempli à son initialisation -> cf. app/models/user.ts : un espace pour _id, pou name, pour surname, pour email, pour password, pour role, et image.  

  }
}
// <<<11.55 COMPONENTE PRINCIPAL Y VISTA > aller à la vue : >app.component.html