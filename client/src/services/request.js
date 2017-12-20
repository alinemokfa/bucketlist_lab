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
