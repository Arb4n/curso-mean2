// 11.54 >>> CREAR MODELOS DE DATOS

export class Song { // pour permettre que cette classe soit utilisable ailleurs
    constructor(
        public _id: string, // le constructeur initialise cette propriété automatiquement et lui assigne une valeur -> cf. access modifiers ; typescript permet de définir les propriétés directement dans les paramètres du constructeur avec des access modifiers. 
        public number: number, // le constructeur initialise cette propriété automatiquement et lui assigne une valeur -> cf. access modifiers ; typescript permet de définir les propriétés directement dans les paramètres du constructeur avec des access modifiers. 
        public name: string,
        public duration: string,
        public file: string,
        public album: string //reminder : album fait le lien avec l'id de l'album
        // Avant, on définissait un constructeur ainsi, et avec des méthodes get et set, ce qui donnait des fichiers plutôt énormes, de même en Symfony ; 
        // maintenant, on fait aussi simplement que cela

    ) { }
}
// << <11.54 CREAR MODELOS DE DATOS
