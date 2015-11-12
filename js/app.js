var Backbone = require('backbone');
window.jQuery = window.$ = Backbone.$;

var ProjectCollection = require('./models/projects');
var ProjectCardView = require('./views/project-card');
var SelectView = require('./views/select');

var Router = Backbone.Router.extend({
  routes: {
    "": "allProjects"
  },
  initialize: function () {
    var self = this;
    this.projects = new ProjectCollection();
    this.listenToOnce(this.projects, 'sync', function () {
      self.selectView = new SelectView({ collection: self.projects});
      self.selectView.on('select:change', self.filterProjects.bind(self));

      Backbone.history.loadUrl();
    });
  },
  allProjects: function () {
    this.listProjects(this.projects);
  },
  filterProjects: function (e) {
    var projects = this.projects.filterBy(e);
    this.listProjects(projects);
  },
  listProjects: function (projects) {
    $('#project-list').empty();
    projects.forEach(function(project) {
      var view = new ProjectCardView({ model: project });
      $('#project-list').append(view.el);
    });
  }
});

window.app = new Router();
Backbone.history.start();
