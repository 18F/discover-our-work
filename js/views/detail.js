var fs = require('fs');

var _ = require('underscore');
var Backbone = require('backbone');

var html = fs.readFileSync(__dirname +  '/../templates/detail.html').toString();
var template = _.template(html);

var ProjectCardView = Backbone.View.extend({
  initialize: function () {
    this.render();
    return this;
  },
  render: function () {
    var hiddenAttributes = ['errors', 'self'],
        opts = {
          project: this.model.toJSON(),
          hidden: hiddenAttributes
        },
        html = template(opts);

    this.$el.html(html);

    window.z = this.model.toJSON();

    return this;
  }
});

module.exports = ProjectCardView;
