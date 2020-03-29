// ==UserScript==
// @name         Edytor formularzy
// @namespace    http://10.0.101.102/
// @version      0.1
// @description  skrypt do automatyzacji formularzy elektronicznych
// @author       Mateusz Naumowicz
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js
// @match        http://10.0.101.102/
// @match        http://10.100.100.20:8004/
// @grant        none
// @updateURL    https://gist.github.com/BroBQ/879b54e5567558f0d6e7012978a5954b/raw/c09df5225f533efcb29d3526ab54b7d8db611452/skryptEdytorFormularzy.user.js
// @downloadURL  https://gist.github.com/BroBQ/879b54e5567558f0d6e7012978a5954b/raw/c09df5225f533efcb29d3526ab54b7d8db611452/skryptEdytorFormularzy.user.js
// ==/UserScript==
let DEVMODE = false;
let keys = [];
const wartoscDomyslna = "[name='editBoxInitValue']";
const walidacja = "input[name='validConst']";
const komunikat = "input[name='validAlarm']";
document.addEventListener('keydown', keysPressed, false);
document.addEventListener("keyup", keysReleased, false);

const walidacjaHektary = "matches(., '^(0\\.[0-9]{4}|[1-9]\\d*\\.[0-9]{4})$')";
const walidacjaStawka = "matches(., '^(0\\.[0-9]{2}|[1-9]\\d*\\.[0-9]{2})$')";
const walidacjaLiczba = "(matches(., '^[0-9]+$'))";
const walidacjaPESEL = "(.!='') and (string-length(.) = 11) and ((( number(substring(., 1, 1))*1+ number(substring(., 2, 1))*3+ number(substring(., 3, 1))*7+ number(substring(., 4, 1))*9+ number(substring(., 5, 1))*1+ number(substring(., 6, 1))*3+ number(substring(., 7, 1))*7+ number(substring(., 8, 1))*9+ number(substring(., 9, 1))*1+ number(substring(., 10, 1))*3+ number(substring(., 11, 1))*1 )mod 10)=0)";
const walidacjaKodPocztowy = "(.!='') and (matches(., '^\\d{2}-\\d{3}$'))";
const walidacjaUlica = "";
const tablicaZWalidacjami = [walidacjaLiczba, walidacjaStawka, walidacjaHektary, ".!=''", walidacjaPESEL, walidacjaKodPocztowy, walidacjaUlica];

const tekstHektary = "Pole wymagane. Proszę podać powierzchnię z dokładnością do 1 m kw. (czterech miejsc po kropce np.: 1.1234)."
const tekstStawka = "Pole wymagane. Proszę wpisać liczbę z dokładnością do dwóch miejsc po kropce."
const tekstLiczba = "Pole wymagane. Proszę wpisać liczbę."
const tekstWymagane = "Pole wymagane."
const tekstPESEL = "Pole wymagane. Proszę wpisać prawidłowy numer PESEL."
const tekstKodPocztowy = "Pole wymagane. Proszę wpisać poprawny kod pocztowy."
const tekstUlica = "";
const tablicaZKomunikatami = [tekstLiczba, tekstStawka, tekstHektary, tekstWymagane, tekstPESEL, tekstKodPocztowy, tekstUlica];

const ulice = "ulica\nplac\nrondo\naleja\nskwer\ninna";
const nazwyPrzyciskow = ["0", "0.00", "0.0000", ".!=''", "PESEL", "KOD POCZTOWY", "Ulice"];
const wartosciDomyslne = ["0", "0.00", "0.0000", "", "", "", ulice];

// let tablicaZPrzyciskami = [];

// class Button {
// 	constructor(selektor, wartoscDomyslna, walidacja, komunikat) {
// 		this.selektor = selektor;
// 		this.wartoscDomyslna = wartoscDomyslna;
// 		this.walidacja = walidacja;
// 		this.komunikat = komunikat;
// 	}

// 	ustawWartosci() {
// 		document.querySelector(wartoscDomyslna).value = this.wartoscDomyslna;
// 		document.querySelector(walidacja).value = this.walidacja;
// 		document.querySelector(komunikat).value = this.komunikat;
// 	}
// }

function ustawWartosci() {
	for (let i = 0; i < nazwyPrzyciskow.length; i++) {
		if (this.innerHTML === nazwyPrzyciskow[i]) {
			document.querySelector(wartoscDomyslna).value = wartosciDomyslne[i];
			document.querySelector(walidacja).value = tablicaZWalidacjami[i];
			document.querySelector(komunikat).value = tablicaZKomunikatami[i];
		}
	}
}

function keysPressed(e) {
	// store an entry for every key pressed
	keys[e.keyCode] = true;

	// Alt + Shift + d
	if (keys[18] && keys[16] && keys[68]) {
		if(DEVMODE === false) {

			// let td = document.querySelector('.x-panel-tbar-noheader .x-toolbar-left-row');

			for (let i = 0; i < nazwyPrzyciskow.length; i++) {
				// td.appendChild(document.createElement("td"));
				let button = document.createElement("button");
				button.innerHTML = nazwyPrzyciskow[i];
				// const selektor = `td:nth-of-type(12) > button:nth-of-type(${i + 1})`;
				// tablicaZPrzyciskami.push(new Button(selektor, wartosciDomyslne[i], tablicaZWalidacjami[i], tablicaZKomunikatami[i]));
				// td.appendChild(button);
				document.querySelector('.x-panel-tbar-noheader .x-toolbar-left-row').appendChild(button);
			}

			let gotowePrzyciski = document.querySelectorAll('.x-panel-tbar-noheader .x-toolbar-left-row > button');
			gotowePrzyciski.forEach(element => {
				element.addEventListener("click", ustawWartosci);
			});
		}
		DEVMODE = true;
	}

	// Alt + Shift + f
	if (keys[18] && keys[16] && keys[70]) {
		DEVMODE = false;
		//test value
		e.preventDefault();
	}
}

function wstawWartoscDomyslna(wartosc = 10) {
    document.querySelector(wartoscDomyslna).value = wartosc;
}

function keysReleased(e) {
	// mark keys that were released
	keys[e.keyCode] = false;
}
