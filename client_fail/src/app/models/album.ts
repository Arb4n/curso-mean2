// 11.54 >>> CREAR MODELOS DE DATOS

export class Album { // pour permettre que cette classe soit utilisable ailleurs
    constructor(
        public _id: string, // le constructeur initialise cette propriété automatiquement et lui assigne une valeur -> cf. access modifiers ; typescript permet de définir les propriétés directement dans les paramètres du constructeur avec des access modifiers. 
        public title: string,
        public description: string,
        public year: number,
        public artist: string,
        public image: string
        // Avant, on définissait un constructeur ainsi, et avec des méthodes get et set, ce qui donnait des fichiers plutôt énormes, de même en Symfony ; 
        // maintenant, on fait aussi simplement que cela

    ) { }
}
// << <11.54 CREAR MODELOS DE DATOS
