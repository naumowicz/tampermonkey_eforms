// ==UserScript==
// @name         epupa search
// @namespace    https://serwis.epuap.gov.pl/mlpz/choseContext
// @version      0.1
// @description  dropdown dla epuap
// @author       Mateusz Naumowicz
// @match        https://serwis.epuap.gov.pl/mlpz/choseContext
// @grant        none
// ==/UserScript==
let DEVMODE = false;
let keys = [];
const wartoscDomyslna = "[name='editBoxInitValue']";
const walidacja = "input[name='validConst']";
const komunikat = "input[name='validAlarm']";
document.addEventListener('keydown', keysPressed, false);
document.addEventListener("keyup", keysReleased, false);



function keysPressed(e) {
	// store an entry for every key pressed
		keys[e.keyCode] = true;

		// Alt + Shift + d
		if (keys[18] && keys[16] && keys[68]) {
			showInstitutionInfo(this)
		}

		// // Alt + Shift + f
		// if (keys[18] && keys[16] && keys[70]) {
		//     //wstawWartoscDomyslna();
		// 	// do something

		// 	// prevent default browser behavior
		// 	e.preventDefault();
		// }


}

function keysReleased(e) {
	// mark keys that were released
	keys[e.keyCode] = false;
}
