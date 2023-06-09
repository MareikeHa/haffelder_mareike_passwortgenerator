import { NUMMERN, SYMBOLE, buchstabenGROß, buchstabenKLEIN } from "./constants";
import { passwortHerunterladen } from "./download";
import { inZwischenablageKopieren } from "./copy";

//Variablen anlegen
export const spanPasswortanzeige = document.querySelector("#data-password") as HTMLSpanElement;              //Passwortanzeige
const inputGroßbuchstaben = document.querySelector("#data-capital-letters") as HTMLInputElement;             //Großbuchstaben
const inputZahlen = document.querySelector("#data-numbers") as HTMLInputElement;                             //Zahlen
const inputSonderzeichen = document.querySelector("#data-symbols") as HTMLInputElement;                      //Sonderzeichen
const inputLaenge = document.querySelector("#data-length") as HTMLInputElement;                              //Länge
const buttonNeuesPasswort = document.querySelector("#newPassword") as HTMLButtonElement;                     //Button neues Passwort
export const buttonPasswortDownload = document.querySelector("#downloadPassword") as HTMLButtonElement;      //Button Passwort herunterladen
const buttonKopieren = document.querySelector("#copyClipboard") as HTMLButtonElement;                        //Button Passwort kopieren

let idCounter = 0;                                          //Variable IDCounter
export const passwoerter: PasswordObject[] = [];            //Array zum speichern der generierten Passwörter nach ID

interface PasswordObject {                                  //definiert Schnittstelle (ist Rückgabetyp der Funktion "neuesPasswortGenerieren")
    id: string;
    password: string;
}

function neuesPasswortGenerieren(): PasswordObject {                //Funktion generiert neues Passwort
    const id = "PW" + idCounter.toString().padStart(4, "0");        //eindeutige ID im Format //PW0001"
    let returnable = "";                                            
    const laenge = parseInt(inputLaenge.value);                     //parse.INT um in Zahl zu ändern             
    const mitGroßbuchstaben = inputGroßbuchstaben.checked;
    const mitZahlen = inputZahlen.checked;
    const mitSonderzeichen = inputSonderzeichen.checked;
    let pool = buchstabenKLEIN;                                     
    if (mitGroßbuchstaben) pool += buchstabenGROß;                  //"mit Großbuchstaben" aktiviert dann zu Pool hinzugefügt
    if (mitZahlen) pool += NUMMERN;
    if (mitSonderzeichen) pool += SYMBOLE;

    for (let i = 0; i < laenge; i++) {                              //läuft solang wie die Passwortlänge + in jedem Durchgang wird  neue Stelle vom Passwort berechnet
        const random = Math.floor(Math.random() * pool.length);     //neue Random Number (aus 0-9 * Länge von Pool) (math.floor macht eine Ganzzahl draus)
        returnable += pool[random];                                 //beliebige Stelle im Pool wird gewählt
    }

    idCounter++;                                                    //erhöht ID-Counter um 1, für das nächste
    return { id, password: returnable };                            //gibt Objekt zurück mit ID und Passwort
}

buttonNeuesPasswort.addEventListener("click", (e) => {               
    e.preventDefault();                                             
    erstelleUndZeigeNeuesPasswort();                                
});

function erstelleUndZeigeNeuesPasswort() {
    const passwordObject = neuesPasswortGenerieren();            
    passwoerter.push(passwordObject);                             //fügt generiertes Passwort zu Array hinzu
    spanPasswortanzeige.innerText = passwordObject.password;      //Passwortanzeige wird neues Passwort zugewiesen --> wird somit angezeigt
    console.log("ID:", passwordObject.id);
}

erstelleUndZeigeNeuesPasswort();                                    

buttonKopieren.addEventListener('click', (e) => {                   
    e.preventDefault();
    inZwischenablageKopieren();                                    
});

buttonPasswortDownload.addEventListener('click', (e) => {
    e.preventDefault();
    passwortHerunterladen();
});