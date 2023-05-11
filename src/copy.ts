import { spanPasswortanzeige } from "./index";

export function inZwischenablageKopieren() {
    navigator.clipboard.writeText(spanPasswortanzeige.innerText)        //Kopiert Passwort in Zwischenablage (alert ist Anzeige)
        .then(() => {
            alert("Passwort wurde in der Zwischenablage kopiert!");
        })
        .catch(err => {
            alert("Etwas ist schiefgelaufen");
            alert(err);
        });
}