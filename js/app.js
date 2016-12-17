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

function getObject(obj, link, callback) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', parseObj);
  oReq.open('GET', link);
  oReq.send();
  function parseObj() {
    let tempStr = this.responseText;
    window[obj] = JSON.parse(tempStr);
    if(typeof callback === 'function') {
      callback();
    }
  }
}

function addTo(id, content, callback) {
  document.getElementById(id).innerText = content;
  if(typeof callback === 'function') {
    callback();
  }
}

function getAndAdd(obj, link, id, content, callback) {
  getObject(obj, link, () => {
    addTo(id, this[obj][content], callback);
  });
}

function runThru(func, param, delim) {
  let tempStr = "";
  let i = 0;
  while(i < param.length) {
    if(i % delim === 0) {
      tempStr += "() => { " + func + "(";
    }
    tempStr += checkParam(param[i]);
    i++;
  }
  function checkParam(param) {
    if(param.charAt(0) === '$') {
      return `${param.substr(1)}, `;
    }else{
      return `"${param}", `;
    }
  }
  tempStr = tempStr.substr(0, tempStr.length - 2);
  for(let i = 0; i < param.length / delim; i ++) {
    tempStr += ") }";
  }
  tempStr = tempStr.substr(8, tempStr.length - 10);
  tempStr += ";";
  eval(tempStr);
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
		name.id = 'personName';
		gender.id = 'personGender';
		species.id = 'personSpecies';
		box.appendChild(name);
		box.appendChild(gender);
		box.appendChild(species);
		sequence.push('currentObj');
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
		runThru('getAndAdd', sequence, 4);
	}
	function planet() {
		let name = document.createElement('h2');
		let terrain = document.createElement('p');
		let population = document.createElement('p');
		let films = document.createElement('li');
		name.id = 'planetName';
		terrain.id = 'planetTerr';
		population.id = 'planetPop';
		films.id = 'filmsList';
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
		runThru('getAndAdd', sequence, 4);
	}
	function starship() {

	}
}

button.addEventListener('click', render);