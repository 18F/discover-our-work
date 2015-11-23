var Backbone = require('backbone');
window.jQuery = window.$ = Backbone.$;

var ViewSwitcher = require('ampersand-view-switcher');

var ProjectCollection = require('./models/projects');
var ProjectListView = require('./views/list');
var ProjectCardView = require('./views/card');
var ProjectDetailView = require('./views/detail');

var Router = Backbone.Router.extend({
  routes: {
    "": "listProjects",
    "projects/:name": "showProject"
  },
  initialize: function () {
    var self = window.x = this,
        el = $('main')[0];

    this.projects = new ProjectCollection();
    this.viewSwitcher = new ViewSwitcher(el);
    this.listenToOnce(this.projects, 'sync', function () {
      Backbone.history.start();
    });
  },
  listProjects: function () {
    var listView = new ProjectListView({ collection: this.projects });
    this.viewSwitcher.set(listView);
  },
  showProject: function (name) {
    var project = this.projects.where({ name: name })[0],
        detailView = new ProjectDetailView({ model: project });
    this.viewSwitcher.set(detailView);
  }
});

window.app = new Router();
