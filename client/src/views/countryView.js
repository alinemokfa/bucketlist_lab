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
