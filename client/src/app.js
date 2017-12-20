const CountryView = require('./views/countryView');
const Request = require('./services/request.js');

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
