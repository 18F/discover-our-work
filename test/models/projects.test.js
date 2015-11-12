var assert = require('assert');
var mocha = require('mocha');
var querystring = require('querystring');
var sinon = require('sinon');

var ProjectCollection = require('../../js/models/projects');
var projectsJson = JSON.stringify(require('../data/projects.json'));
var fieldsJson = require('../data/projectFields.json');

var apiUrl = 'https://team-api.18f.gov/public/api/projects/';

var server;

beforeEach(function () {
  server = sinon.fakeServer.create();
  sinon.xhr.supportsCORS = true;
});

describe('Project collection', function () {
  it('fetches and parses', function () {
    var projects = new ProjectCollection();

    server.respondWith('GET', apiUrl, mockResponse(projectsJson));
    server.respond();

    assert.equal(projects.length, 35);
  });

  it('correctly getFields()', function () {
    var projects = new ProjectCollection();

    server.respondWith('GET', apiUrl, mockResponse(projectsJson));
    server.respond();

    assert.equal(projects.getFields().length, fieldsJson.length);
  });
});

afterEach(function () {
  server.restore();
});

/**
 * Makes a consistent mocked HTTP response for Sinon
 * @param {string} data - the body of the response
 * @param {integer} status (optional) - HTTP status code to return
 */
function mockResponse(data, status) {
  status = status || 200;
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  var req = [status, headers, data];

  return req;
}
