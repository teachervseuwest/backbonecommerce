var ListItemView = Backbone.View.extend({
  initialize: function() {
    this.render();
    return this;
  },
  render: function() {
    this.el.innerHTML = '';
    this.collection.each(function(model) {
      var view = new ItemModelView({model: model});
      this.el.append(view.render().el);
    }.bind(this));
    return this;
	},
});

var ItemModelView = Backbone.View.extend({
  className: 'item',
  template: _.template(document.getElementById('model-item-template').innerHTML),
  render: function() {
    this.el.innerHTML = '';
		this.el.innerHTML = this.template(this.model.attributes);
    return this;
	},
  events: {
    'click': 'open',
    'click #remove': 'delete',
  },
  open: function() {
    var site = new Item({
      model: this.model,
    });
		new Site().el.append(site.el);
  },
});
