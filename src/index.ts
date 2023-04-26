//Variablen anlegen

const spanPasswortanzeige = document.querySelector<HTMLSpanElement>("[data-password]");           //Anzeige von generiertem Passwort + sagen dass Span Element (mit [] genaue Suche nach benennung)
const form = document.querySelector<HTMLFormElement>("form");                                     //Form
const inputGroßbuchstaben = document.querySelector<HTMLInputElement>("[data-capital-letters]");   //Großbuchstaben
const inputZahlen = document.querySelector<HTMLInputElement>("[data-numbers]");                   //Zahlen
const inputSonderzeichen = document.querySelector<HTMLInputElement>("[data-symbols]");            //Sonderzeichen
const inputLength = document.querySelector<HTMLInputElement>("[data-length]");                    //Länge
const buttonNeuesPasswort = document.querySelector<HTMLButtonElement>("[newPassword]");           //Button neues Passwort
const buttonPasswortDownload = document.querySelector<HTMLButtonElement>("[downloadPassword]");   //Button Passwort herunterladen