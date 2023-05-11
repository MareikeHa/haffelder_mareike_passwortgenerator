import { passwoerter } from "./index";

export function passwortHerunterladen() {
    let dateiText = "";
    for (const passwort of passwoerter) { //Schleife durch alle generierten Passwörter
        dateiText += `ID: ${passwort.id}\nPasswort: ${passwort.password}\n\n`; //erstellt Text mit ID und Passwort 
    }
    const link = document.createElement("a"); // Element "Link" wird mit <a> (definiert ein Hyperlink) erstellt
    const datei = new Blob([dateiText], { type: 'text/plain' }); // Blob Objekt mit Inhalt, der im Textfile enthalten sein soll
    link.href = URL.createObjectURL(datei); //die Blob-Objekt URL wird in href-Attribut des <a>-Tags hinzugefügt
    link.download = "passwort.txt"; //Standarddatei-Name festlegen
    link.click(); //click Event für das <a>-Element, um Datei zu speichern
    URL.revokeObjectURL(link.href);
}