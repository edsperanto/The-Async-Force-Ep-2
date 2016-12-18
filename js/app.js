this.currentObj;
let searchQuery;
let box = document.getElementById('contentContainer');
let button = document.getElementById('requestResourceButton');
let text = document.getElementById('resourceId');
let type = document.getElementById('resourceType');

function resetQuery() {
	window.searchQuery = "https://swapi.co";
}

function emptyBox() {
	box.innerHTML = "";
}

function getAndAdd(obj, link, id, content) {
	let oReq = new XMLHttpRequest();
	let nextThing;
	if(obj !== undefined) {
		oReq.addEventListener('load', parseObj);
		oReq.open('GET', link);
		oReq.send();
	}
	function parseObj() {
		let tempStr = this.responseText;
		window[obj] = JSON.parse(tempStr);
		document.getElementById(id).innerText = window[obj][content];
		if(typeof nextThing === 'function') {
			nextThing();
		}
	}
	return {
		then: callback => nextThing = callback
	}
}

function render() {
	let sequence = [];
	resetQuery();
	emptyBox();
	switch(type.value) {
		case 'people':
			person();
			break;
		case 'planets':
			planet();
			break;
		case 'starships':
			starship();
			break;
	}
	function person() {
		let name = document.createElement('h2');
		let gender = document.createElement('p');
		let species = document.createElement('p');
		let link = 'http://swapi.co/api/people/' + text.value + '/';
		name.id = 'personName';
		gender.id = 'personGender';
		species.id = 'personSpecies';
		box.appendChild(name);
		box.appendChild(gender);
		box.appendChild(species);
		/*sequence.push('currentObj');
		sequence.push('http://swapi.co/api/people/' + text.value + '/');
		sequence.push('personName');
		sequence.push('name');
		sequence.push('currentObj');
		sequence.push('http://swapi.co/api/people/' + text.value + '/');
		sequence.push('personGender');
		sequence.push('gender');
		sequence.push('currentObj');
		sequence.push('$currentObj.species[0]');
		sequence.push('personSpecies');
		sequence.push('name');
		runThru('getAndAdd', sequence, 4);*/
		getAndAdd('currentObj', link, 'personName', 'name')
		.then(getAndAdd('currentObj', link, 'personGender', 'gender'))
		.then(getAndAdd('currentObj', link, 'personSpecies', 'name'));
	}
	function planet() {
		this.filmObj;
		let name = document.createElement('h2');
		let terrain = document.createElement('p');
		let population = document.createElement('p');
		this.films = document.createElement('ul');
		name.id = 'planetName';
		terrain.id = 'planetTerr';
		population.id = 'planetPop';
		box.appendChild(name);
		box.appendChild(terrain);
		box.appendChild(population);
		box.appendChild(films);
		sequence.push('currentObj');
		sequence.push('http://swapi.co/api/planets/' + text.value + '/');
		sequence.push('planetName');
		sequence.push('name');
		sequence.push('currentObj');
		sequence.push('http://swapi.co/api/planets/' + text.value + '/');
		sequence.push('planetTerr');
		sequence.push('terrain');
		sequence.push('currentObj');
		sequence.push('http://swapi.co/api/planets/' + text.value + '/');
		sequence.push('planetPop');
		sequence.push('population');
		runThru('getAndAdd', sequence, 4, () => {
			let filmSeq = [];
			for(let i = 0; i < currentObj.films.length; i++) {
				let film = document.createElement('li');
				film.id = 'film' + (i + 1);
				films.appendChild(film);
				filmSeq.push('filmObj');
				filmSeq.push(currentObj.films[i]);
				filmSeq.push('film' + (i + 1));
				filmSeq.push('title');
			}
			runThru('getAndAdd', filmSeq, 4);
		});
	}
	function starship() {
		let name = document.createElement('h2');
		let manu = document.createElement('p');
		let starClass = document.createElement('p');
		this.films = document.createElement('ul');
		name.id = 'starshipName';
		manu.id = 'starshipManu';
		starClass.id = 'starshipClass';
		box.appendChild(name);
		box.appendChild(manu);
		box.appendChild(starClass);
		box.appendChild(films);
		sequence.push('currentObj');
		sequence.push('http://swapi.co/api/starships/' + text.value + '/');
		sequence.push('starshipName');
		sequence.push('name');
		sequence.push('currentObj');
		sequence.push('http://swapi.co/api/starships/' + text.value + '/');
		sequence.push('starshipManu');
		sequence.push('manufacturer');
		sequence.push('currentObj');
		sequence.push('http://swapi.co/api/starships/' + text.value + '/');
		sequence.push('starshipClass');
		sequence.push('starship_class');
		runThru('getAndAdd', sequence, 4, () => {
			let filmSeq = [];
			for(let i = 0; i < currentObj.films.length; i++) {
				let film = document.createElement('li');
				film.id = 'film' + (i + 1);
				films.appendChild(film);
				filmSeq.push('filmObj');
				filmSeq.push(currentObj.films[i]);
				filmSeq.push('film' + (i + 1));
				filmSeq.push('title');
			}
			runThru('getAndAdd', filmSeq, 4);
		});
	}
}

button.addEventListener('click', render);