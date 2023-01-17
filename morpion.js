let linkJ1 = "/image-morpion/rond.png";
let linkJ2 = "/image-morpion/croix.png";
let tour = 0;
let playCaseJ1 = [];
let playCaseJ2 = [];
let boolVictory = false;
let ai = false;
let scorej1 = 0;
let scorej2 = 0;

function jouer(zone) {

	document.getElementById("choixMode").disabled = true;
 
	if (!playCaseJ1.includes(zone) && boolVictory == false || !playCaseJ2.includes(zone) && boolVictory == false) {
		if (tour % 2 == 0 || ai == true ) {
			// joueur 1
			document.getElementById(zone).innerHTML += '<img class="rond" src=' + linkJ1 + ' alt="joueur1"></img>';
			playCaseJ1.push(zone);

			console.log(playCaseJ1);

			victory(playCaseJ1, "J1");

			// tour IA
			playAi();

		} else {
			if (ai == false) {
				// joueur 2
				document.getElementById(zone).innerHTML += '<img class="croix" src=' + linkJ2 + ' alt="joueur2"></img>';
				playCaseJ2.push(zone);
				victory(playCaseJ2, "J2");
			}
		}

		tour++
	}else if ( boolVictory == true ){
		alert("Partie terminée.");
	} else {
		alert("Case déjà jouée.");
	}

	if ( tour == 9 ){
		Initialisation();
	}

}

function playAi() {
	if ( ai == true && boolVictory == false ) {
		let positions = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
		let newPlay;

		do {
			let random = Math.floor(Math.random() * 8);
			newPlay = positions[random];
		} while (playCaseJ1.includes(newPlay) || playCaseJ2.includes(newPlay))

		document.getElementById(newPlay).innerHTML += '<img class="croix" src=' + linkJ2 + ' alt="joueur2"></img>';
		playCaseJ2.push(newPlay);
		victory(playCaseJ1, "J2");
	}
}

function Initialisation() {

	document.getElementById("rejouer").setAttribute("hidden", true);
	
	if ( boolVictory == true ) {
		
		let images = document.querySelectorAll("td img");

		images.forEach(element => {
			element.remove();
		});

		playCaseJ1 = [];
		playCaseJ2 = [];

		boolVictory = false;
	}
}

function aiChoice() {
	// changement statut IA
	if (ai == false) {
		document.getElementById("choixMode").value = "Choix du mode de jeu : J vs Ai";
		ai = true;
	} else {
		ai = false;
		document.getElementById("choixMode").value = "Choix du mode de jeu : J vs J";
	}
}

function victory(tableau, j) {
	if (
		tableau.includes('a1') && tableau.includes('a2') && tableau.includes('a3') ||
		tableau.includes('b1') && tableau.includes('b2') && tableau.includes('b3') ||
		tableau.includes('c1') && tableau.includes('c2') && tableau.includes('c3') ||

		tableau.includes('a1') && tableau.includes('b1') && tableau.includes('c1') ||
		tableau.includes('a2') && tableau.includes('b2') && tableau.includes('c2') ||
		tableau.includes('a3') && tableau.includes('b3') && tableau.includes('c3') ||

		tableau.includes('c1') && tableau.includes('b2') && tableau.includes('a3') ||
		tableau.includes('c3') && tableau.includes('b2') && tableau.includes('a1')) {
		
		if ( j == "J1"){
			alert("LES RONDS ONT GAGNE !");
			scorej1++;
		}else{
			alert("LES CROIX ONT GAGNE !");
			scorej2++;
		}

		boolVictory = true;
		tour = 0;
		document.getElementById("rejouer").removeAttribute("hidden");
		document.getElementById("choixMode").disabled = false;
	}
}