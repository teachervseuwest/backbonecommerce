var ListOrderView = Backbone.View.extend({
  initialize: function() {
    this.render();
    return this;
  },
  render: function() {
    this.el.innerHTML = '';
    this.collection.each(function(model) {
      var view = new OrderModelView({model: model});
      this.el.append(view.render().el);
    }.bind(this));
    return this;
	},
});

var OrderModelView = Backbone.View.extend({
  className: 'item',
  template: _.template(document.getElementById('model-order-template').innerHTML),
  render: function() {
    this.el.innerHTML = '';
		this.el.innerHTML = this.template(this.model.attributes);
    return this;
	},
  events: {
    'click': 'open',
  },
  open: function() {
    var site = new Order({
      model: this.model,
    });
		new Site().el.append(site.el);
  },
});
