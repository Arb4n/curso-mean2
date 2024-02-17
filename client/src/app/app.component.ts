import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';// <<<11.58 CREER DES SERVICES >services/user.service.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
  // 11.58>>> <user.service.ts : pour utiliser UserService, injection de dépendances ici en tant que provider
  providers: [UserService] // ; dans providers, se chargent /s'utilisent tous les services dont on a besoin ; ici, userService
})
export class AppComponent implements OnInit {
  public title = '♪♫ MUSIFY ♫♪';
  // cf. https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  // The way to tell this to the compiler is to add the ! definite assignment assertion operator, as in:
  // @Input() userId!: string;
  // Now, the compiler understands that this variable, although not defined at compile time, shall be defined at run - time, and in time, before it is being used.
  // It is now up to the application to ensure this variable is defined before being used.
  public user!: User;
  public identity = false; // Assuming identity is of type User or can be null
  // pour tester les données de l'utilisateur connecté :
  // tout l'objet user est identifié dedans, -> quand le login est fait dans le local storage, un objet identity est sauvegardé = au moment du chargement du composant, la première chose que fait l'app  
  public token; // le token pour passer le service

  // Le constructeur : assigne une valeur à une propriété de la classe 
  // par défaut, on donne donc une valeur à la propriété user
  // On crée dans la propriété user un objet User avec sa propriété initialisée vide
  // 11.58>>> Charger UserService dans le constructeur :
  // assignation d'une propriété userService qui va charger toutes les méthodes de notre service, 
  // et sera de type UserService :
  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', ''); //On a un objet User vide, qui sera rempli à son initialisation -> cf. app/models/user.ts : un espace pour _id, pou name, pour surname, pour email, pour password, pour role, et image.  

  }

  // 11.58>>> ici, on appelle le service UserService
  // Comment ? -> ngOnInit : charge le composant, exécute le code 
  // ngOnInit à importer en haut ↑ && à implémenter dans la méthode AppComponent 
  ngOnInit() {
    var texte = this._userService.signUp() // appel de la méthode : this.objetduService.AppelDeLaméthode
    console.log(texte);
  }
  // 11.57>>> <app.component.html
  //  créer la méthode onSubmit pour vérifier les données du formulaire -- >
  public onSubmit() {
    console.log(this.user);
  }
}
