var Backbone = require('backbone');

var SelectView = Backbone.View.extend({
  events: {
    'change': 'change'
  },
  initialize: function (opts) {
    return this;
  },
  render: function () {
    var self = this;

    this.$el.html('<label for="select-filter">Filter projects by</label><select id="select-filter"></select>');
    this.collection.getFields().forEach(function(f) {
      var html = `<option value="${f}">${f}</option>`;
      self.$('select').append(html)
    });

    this.delegateEvents(this.events);
    return this;
  },
  change: function (e) {
    this.trigger('select:change', e.target.value);
  }
});

module.exports = SelectView;
