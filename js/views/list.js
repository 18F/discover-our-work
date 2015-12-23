var fs = require('fs');

var Backbone = require('backbone');
var _ = require('underscore');

var SelectView = require('./select');
var ProjectCardView = require('./card');

var html = fs.readFileSync(__dirname +  '/../templates/list.html').toString();
var template = _.template(html);

var ProjectListView = Backbone.View.extend({
  initialize: function () {
    var self = this,
        opts = {
          collection: this.collection
        };
    this.selectView = new SelectView(opts);
    this.selectView.on('select:change', this.filterProjects.bind(self));

    return this;
  },
  render: function () {
    this.$el.html(template());
    this.listProjects(this.collection);

    this.selectView.$el = this.$('#filter');
    this.selectView.render();
    return this;
  },
  filterProjects: function (e) {
    var projects = this.collection.filterBy(e);
    this.listProjects(projects);
  },
  listProjects: function (projects) {
    var self = this;
    this.$('#project-list').empty();
    projects.forEach(function(project) {
      var view = new ProjectCardView({ model: project });
      self.$('#project-list').append(view.el);
    });
  },
});

module.exports = ProjectListView;
