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
const buttonSpeichern = document.querySelector("[saveclipboard]") as HTMLButtonElement;

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

    for (let i = 0; i < laenge; i++) {                              //Schleife (läuft solang wie die Passwortlänge + in jedem Durchgang wird eine neue Stelle vom Passwort berechnet)
        const random = Math.floor(Math.random() * pool.length);     //neue Random Number (aus 0-9 * Länge von Pool) (math.floor macht eine Ganzzahl draus)
        returnable += pool[random];                                 //beliebige Stelle im Pool wird gewählt
    }

    return returnable                                               //gibt die Passwortstellen zurück
}

buttonNeuesPasswort.addEventListener("click", (e) => {                            //wenn auf "Neues Passwort" geklickt wird 
    e.preventDefault();                                             //dass Seite nicht neuläd wenn man auf "Neues Passwort" klickt
    erstelleUndZeigeNeuesPasswort();                                //ruft Funktion auf
});

function erstelleUndZeigeNeuesPasswort() {
    spanPasswortanzeige.innerText = neuesPasswortGenerieren();      //Passwortanzeige wird das neue Passwort zugewiesen --> wird somit angezeigt
}

erstelleUndZeigeNeuesPasswort();                                    //ruft Funktion auf (so wird bei Öffnen der Seite gleich ein Passwort angezeigt)


buttonSpeichern.addEventListener('click', (e) => {                  //wenn auf Button "Speichern" geklickt wird 
    e.preventDefault();
    inZwischenablagespeichern();                                    //ruft Funktion auf
});

function inZwischenablagespeichern() {
    navigator.clipboard.writeText(spanPasswortanzeige.innerText)    //Kopiert Passwort in Zwischenablage (alert ist Anzeige)
        .then(() => {
            alert("Passwort wurde in der Zwischenablage kopiert!")
        })
        .catch(err => {
            alert("Etwas ist schief gelaufen");
            alert(err);
        })
}


buttonPasswortDownload.addEventListener('click', (e) => {                           //wenn Klick auf Button "Passwort herunterladen"
    e.preventDefault();
    passwortHerunterladen();
});

function passwortHerunterladen() {
    const link = document.createElement("a");                                        // Element "Link" wird mit <a> (definiert ein Hyperlink) erstellt
    const datei = new Blob([spanPasswortanzeige.innerText], { type: 'text/plain' }); // Blob Objekt mit Inhalt, der im Textfile enthalten sein soll
    link.href = URL.createObjectURL(datei);                                          //die Blob-Objekt URL wird in href-Attribut des <a>-Tags hinzugefügt
    link.download = "passwort.txt";                                                  //Standarddatei-Name festlegen
    link.click();                                                                    //click Event für das <a>-Element, um Datei zu speichern
    URL.revokeObjectURL(link.href);
}
