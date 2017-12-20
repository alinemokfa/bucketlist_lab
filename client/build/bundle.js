/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.makeRequest = function (requestType, url, callback, secondCallback) {
  let status = 500;
  switch (requestType) {
    case 'GET':
      status = 200;
      break;
    case 'POST':
      status = 201;
      break;
    case 'DELETE':
      status = 204;
      break;
  }
  const request = new XMLHttpRequest();
  request.open( requestType, url );
  if (requestType === 'POST') {
    request.setRequestHeader('Content-type', 'application/json');
  };
  request.addEventListener('load', function () {
    if (this.status !== status) {
      return;
    };
    const boundToRequest = secondCallback.bind(request);
    boundToRequest();
  });
  return request;
}

Request.prototype.get = function(callback) {
  const secondCallback = function () {
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  }
  const newRequest = this.makeRequest('GET', this.url, callback, secondCallback);
  newRequest.send();
}

Request.prototype.post = function(callback, body) {
  const secondCallback = function () {
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  };
  const newRequest = this.makeRequest('POST', this.url, callback, secondCallback);
  newRequest.send(JSON.stringify(body)); //outside the aboce because you cannot send a request before actually having the dat
}

Request.prototype.delete = function(callback) {
  const newRequest = this.makeRequest('DELETE', this.url, callback, null);
  newRequest.send();
}

module.exports = Request;


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const CountryView = __webpack_require__(3);
const Request = __webpack_require__(0);

const ourAPIurl = "http://localhost:3000/api/countries"
const countriesAPIurl = "https://restcountries.eu/rest/v2"

const countryView = new CountryView();
const request = new Request(ourAPIurl)
const requestCountries = new Request(countriesAPIurl)

const app = function(){

  requestCountries.get(requestComplete)
  request.get(requestBucket)

  const dropDownList = document.querySelector('#dropdown-countries');
  dropDownList.addEventListener('change', onOptionSelection);

  const bucketList = document.querySelector('#bucket-list');
  bucketList.addEventListener('change', onBucketOptionSelection);

  const deleteButton = document.querySelector('#delete-button');
  deleteButton.addEventListener('click', request.delete);
}

let countriesArray = [];
let bucketListArray = [];

const requestComplete = function(countries) {
  countriesArray = countries;
  // if (this.status !== 200) return;
  // const jsonString = this.responseText;
  // countries = JSON.parse(jsonString);

  populateDropdownMenu(countriesArray);
}

const requestBucket = function(countries) {
  bucketListArray = countries;
  // if (this.status !== 200) return;
  // const jsonString = this.responseText;
  // countries = JSON.parse(jsonString);

  populateBucketlist(bucketListArray);
}

// const populateBucketList = function (countries) {
//   const ul = document.querySelector('#country-list');
//   countries.forEach(function(country){
//     const li = document.createElement('li');
//     li.innerText = country.name;
//     ul.appendChild(li);
//   })
// }

const populateBucketlist = function (countries) {
  const select = document.querySelector('#bucket-list');
  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

const populateDropdownMenu = function (countries) {
  const select = document.querySelector('#dropdown-countries');
  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

const onOptionSelection = function() {
  const selectedIndex = this.value;
  const selectedCountry = countriesArray[selectedIndex];
  request.post(countryView.addCountry.bind(countryView), selectedCountry);
}

const onBucketOptionSelection = function() {
  const selectedIndex = this.value;
  console.log(bucketListArray);
  const selectedCountry = bucketListArray[selectedIndex];

  const ul = document.querySelector('#selected-country');
  const name = document.createElement('li');
  const subregion = document.createElement('li');
  const deleteButton = document.createElement('button');
    name.innerText = selectedCountry.name;
    subregion.innerText = selectedCountry.subregion;
    ul.appendChild(name);
    ul.appendChild(subregion);
}



document.addEventListener('DOMContentLoaded', app);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var CountryView = function(){
  this.countries = [];
}

CountryView.prototype.addCountry = function(country) {
  this.countries.push(country);
  this.render(country);
}

CountryView.prototype.clear = function(country) {
  this.countries = [];
  const ul = document.querySelector('#countries');
  ul.innerHTML = '';
}

CountryView.prototype.render = function(country){
  console.log(country);
    const select = document.querySelector('#bucket-list');
    // const li = document.createElement('li');
    const option = document.createElement('option');
    //
    // const text = document.createElement('p');
    option.innerText = `${country.name}`;
    select.appendChild(option);
    // ul.appendChild(li);
}

 module.exports = CountryView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map