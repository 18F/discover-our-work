var fs = require('fs');

var _ = require('underscore');
var Backbone = require('backbone');

var html = fs.readFileSync(__dirname +  '/../templates/project.html').toString();
var template = _.template(html);

var ProjectCardView = Backbone.View.extend({
  className: 'project',
  tagName: 'li',
  initialize: function () {
    this.render();
    return this;
  },
  render: function () {
    var defaults = {
          description: 'Description',
          stack: []
        },
        attrs = _.extend({}, defaults, this.model.attributes);

    var html = template(attrs);

    this.$el.html(html);

    return this;
  }
});

module.exports = ProjectCardView;
