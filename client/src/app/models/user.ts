// 11.54 >>> CREAR MODELOS DE DATOS


// Ça: c'est la même chose que de passer une propriété en créant l'objet pour lui assigner ensuite une valeur
// export class USer{
//     public _id: string;
//     constructor(
//         _id: string
//     ) {
//         this._id = _id;
//     }
// }
// Mais avec tscript et les nouveaux standards Ecma script 2015, on peut simpleifier et faire ainsi : 

export class User { // pour permettre que cette classe soit utilisable ailleurs
    constructor(
        public _id: string, // le constructeur initialise cette propriété automatiquement et lui assigne une valeur -> cf. access modifiers ; typescript permet de définir les propriétés directement dans les paramètres du constructeur avec des access modifiers.
        // 11.55>>> COMPONENTE PRINCIPAL Y VISTA : 
        //  add '?' =  If you don't have values for some properties at the time of creation, consider making those properties optional in the constructor by adding a '?'
        // <<<11.55 COMPONENTE PRINCIPAL Y VISTA
        public name?: string,
        public surname?: string,
        public email?: string,
        public password?: string,
        public role?: string,
        public image?: string
        // Avant, on définissait un constructeur ainsi, et avec des méthodes get et set, ce qui donnait des fichiers plutôt énormes, de même en Symfony ; 
        // maintenant, on fait aussi simplement que cela

    ){}
}
// << <11.54 CREAR MODELOS DE DATOS
