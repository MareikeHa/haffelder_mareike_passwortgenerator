import { NUMMERN, SYMBOLE, buchstabenGROß, buchstabenKLEIN } from "./constants";

//Variablen anlegen
const spanPasswortanzeige = document.querySelector("[data-password]") as HTMLSpanElement;              //Anzeige von generiertem Passwort + sagen dass Span Element (mit [] genaue Suche nach benennung)
const form = document.querySelector("form") as HTMLFormElement;                                        //Form
const inputGroßbuchstaben = document.querySelector("[data-capital-letters]") as HTMLInputElement;      //Großbuchstaben
const inputZahlen = document.querySelector("[data-numbers]") as HTMLInputElement;                      //Zahlen
const inputSonderzeichen = document.querySelector("[data-symbols]") as HTMLInputElement;               //Sonderzeichen
const inputLaenge = document.querySelector("[data-length]") as HTMLInputElement;                       //Länge
const spanLaengenanzeige = document.querySelector("[data-current-length]") as HTMLSpanElement;         //Längenanzeige (Zahl)
const buttonNeuesPasswort = document.querySelector("[newPassword]") as HTMLButtonElement;              //Button neues Passwort
const buttonPasswortDownload = document.querySelector("[downloadPassword]") as HTMLButtonElement;      //Button Passwort herunterladen

function neuesPasswortGenerieren(): string {                        //Funktion generiert neues Passwort
    let returnable = "";                                            //Passwortstellen
    const laenge = parseInt(inputLaenge.value);                     //parse.INT um in Zahl zu ändern             
    const mitGroßbuchstaben = inputGroßbuchstaben.checked;
    const mitZahlen = inputZahlen.checked;
    const mitSonderzeichen = inputSonderzeichen.checked;
    let pool = buchstabenKLEIN;                                     //sind immer enthalten
    if (mitGroßbuchstaben) pool += buchstabenGROß;                  //falls "mit Großbuchstaben" aktiviert dann zu Pool hinzugefügt
    if (mitZahlen) pool += NUMMERN;
    if (mitSonderzeichen) pool += SYMBOLE;


    for (let i = 0; i < laenge; i++) {                              //Schleife (läuft solang wie die Passwortlänge)
                                                                    //in jedem Durchgang wird eine neue Stelle vom Passwort berechnet
        const random = Math.floor(Math.random() * pool.length);     //neue Random Number (aus 0-9 * Länge von Pool) (math.floor macht eine Ganzzahl draus)
        returnable += pool[random];                                 //beliebige Stelle im Pool wird gewählt
    }

    return returnable                                               //gibt die Passwortstellen zurück
}

console.log(neuesPasswortGenerieren());