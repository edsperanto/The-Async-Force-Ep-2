let searchQuery;
let currentObj;
let box = document.getElementById('contentContainer');
let button = document.getElementById('requestResourceButton');
let text = document.getElementById('resourceId');
let type = document.getElementById('resourceType');

function resetQuery() {
	window.searchQuery = "https://swapi.co";
}

function emptyBox() {
	box.innerHtml = "";
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

var sequence = [
  'currentObj',
  'http://swapi.co/api/people/1/',
  'person4Name',
  'name',
  'currentObj',
  '$currentObj.homeworld',
  'person4HomeWorld',
  'name',
  'currentObj',
  'http://swapi.co/api/people/14/',
  'person14Name',
  'name',
  'currentObj',
  '$currentObj.species',
  'person14Species',
  'name'
];

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
	let sequence = ['currentObj'];
	resetQuery();
	emptyBox();
	switch(type.value) {
		case 'Person':
			person();
			break;
		case 'Planet':
			planet();
			break;
		case 'Starship':
			starship();
			break;
	}
	function person() {
		let name = document.createElement('h2');
		let gender = document.createElement('p');
		let species = document.createElement('')
		sequence.push('http://swapi.co/api/people/' + text.value);
	}
	function planet() {

	}
	function starship() {

	}
}

button.addEventListener('click', render);