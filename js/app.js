this.currentObj;
this.filmObj;
let searchQuery;
let box = document.getElementById('contentContainer');
let button = document.getElementById('requestResourceButton');
let text = document.getElementById('resourceId');
let type = document.getElementById('resourceType');

//http://swapi.co/api/planets/
function search(thing, num) {
	return `https://swapi.co/api/${thing}/${num}/`;
}

function getAndAdd(obj, link, id, content, callback) {
	let oReq = new XMLHttpRequest();
	oReq.addEventListener('load', parse);
	oReq.open('GET', link);
	oReq.send();
	function parse() {
		let tempStr = this.responseText;
		window[obj] = JSON.parse(tempStr);
		document.getElementById(id).innerText = window[obj][content];
		if(typeof callback === 'function') {
			callback();
		}
	}
}

function render() {
	let sequence = [];
	let link;
	box.innerHTML = "";
	switch(type.value) {
		case 'people':
			link = search('people', text.value);
			person();
			break;
		case 'planets':
			link = search('planets', text.value);
			planet();
			break;
		case 'starships':
			link = search('starships', text.value);
			starship();
			break;
	}
	function person() {
		let name = document.createElement('h2');
		let gender = document.createElement('p');
		let species = document.createElement('p');
		name.id = 'personName';
		gender.id = 'personGender';
		species.id = 'personSpecies';
		box.appendChild(name);
		box.appendChild(gender);
		box.appendChild(species);
		getAndAdd('currentObj', link, 'personName', 'name', () => {
			getAndAdd('currentObj', link, 'personGender', 'gender', () => {
				getAndAdd('currentObj', currentObj.species[0], 'personSpecies', 'name');
			});
		});
	}
	function planet() {
		let name = document.createElement('h2');
		let terrain = document.createElement('p');
		let population = document.createElement('p');
		let films = document.createElement('ul');
		name.id = 'planetName';
		terrain.id = 'planetTerr';
		population.id = 'planetPop';
		box.appendChild(name);
		box.appendChild(terrain);
		box.appendChild(population);
		box.appendChild(films);
		getAndAdd('currentObj', link, 'planetName', 'name', () => {
			getAndAdd('currentObj', link, 'planetTerr', 'terrain', () => {
				getAndAdd('currentObj', link, 'planetPop', 'population', () => {
					for(let i = 0; i < currentObj.films.length; i++) {
						let film = document.createElement('li');
						film.id = 'film' + (i + 1);
						films.appendChild(film);
						getAndAdd('filmObj', currentObj.films[i], 'film' + (i + 1), 'title');
					}
				});
			});
		});
	}
	function starship() {
		let name = document.createElement('h2');
		let manu = document.createElement('p');
		let starClass = document.createElement('p');
		let films = document.createElement('ul');
		name.id = 'starshipName';
		manu.id = 'starshipManu';
		starClass.id = 'starshipClass';
		box.appendChild(name);
		box.appendChild(manu);
		box.appendChild(starClass);
		box.appendChild(films);
		getAndAdd('currentObj', link, 'starshipName', 'name', () => {
			getAndAdd('currentObj', link, 'starshipManu', 'manufacturer', () => {
				getAndAdd('currentObj', link, 'starshipClass', 'starship_class', () => {
					for(let i = 0; i < currentObj.films.length; i++) {
						let film = document.createElement('li');
						film.id = 'film' + (i + 1);
						films.appendChild(film);
						getAndAdd('filmObj', currentObj.films[i], 'film' + (i + 1), 'title');
					}
				});
			});
		});
	}
}

button.addEventListener('click', render);