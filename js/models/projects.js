var Backbone = require('backbone');
var _ = require('underscore');

var ProjectModel = require('./project');

var ProjectCollection = Backbone.Collection.extend({
  model: ProjectModel,
  url: 'https://team-api.18f.gov/public/api/projects/',
  parse: function(resp, opts) {
    return resp.results;
  },
  initialize: function () {
    this.fetch();
    return this;
  },
  filterBy: function (field, value) {
    field = field || 'type';
    var filtered = this.filter(function(i) {
      if (!value) return i.attributes[field];
      return i.attributes[field] === value;
    });

    return filtered;
  },
  getFields: function () {
    var fields = this.map(function(i){
      return Object.keys(i.attributes);
    });

    return _.chain(fields).flatten().uniq().value();
  }
});

module.exports = ProjectCollection;
