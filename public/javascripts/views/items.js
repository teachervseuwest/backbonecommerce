var ItemsView = Backbone.View.extend({
  initialize: function() {
    this.render();
    return this;
  },
  render: function() {
    this.el.innerHTML = '';
    this.collection.each(function(model) {
      var view = new ItemView({model: model});
      this.el.append(view.render().el);
    }.bind(this));
    return this;
	},
});

var ItemView = Backbone.View.extend({
  className: 'item',
  template: _.template(document.getElementById('model-item-template').innerHTML),
  render: function() {
    this.el.innerHTML = '';
		this.el.innerHTML = this.template(this.model.attributes);
    return this;
	},
  events: {
    'click img': 'open',
    'click button': 'tocart',
  },
  open: function() {
    this.model.open();
  },
  tocart: function(e) {
    if (e.target.getAttribute('inactive') == 'true') return;
    e.target.setAttribute('inactive', true);
    Socket.emit('shoppingcart.add', this.model.get('_id'));
    User.set('shoppingcart', User.get('shoppingcart')+1);
  },
});
