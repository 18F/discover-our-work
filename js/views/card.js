var fs = require('fs');

var _ = require('underscore');
var Backbone = require('backbone');

var html = fs.readFileSync(__dirname +  '/../templates/card.html').toString();
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
          stack: undefined,
          description: undefined
        },
        attrs = _.extend({}, defaults, this.model.attributes),
        missing = missingAttributes(attrs),
        html = template(attrs);

    if (missing) {
      this.$el.addClass('highlight');
      this.$el.attr('title', titleTemplate(missing));
    }

    this.$el.html(html);

    return this;
  }
});

function missingAttributes(attrs) {
  var keys = _.keys(attrs),
      missing = [];

  keys.forEach(function (k) {
    var v = attrs[k];
    if (v === undefined) missing.push(k);
  });

  if (missing.length > 0) return missing;

  return false;
}

function titleTemplate(missing) {
  var ts = ['This project is missing attributes:',
            '<% _.each(missing, function(m) { %>* <%- m %>\n<% }); %>'
          ].join('\n'),
      template = _.template(ts)({ missing: missing });

  return template;
}

module.exports = ProjectCardView;
