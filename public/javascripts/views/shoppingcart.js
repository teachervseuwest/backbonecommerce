var ShoppingcartView = Backbone.View.extend({
  initialize: function() {
    this.render();
    return this;
  },
  render: function() {
    this.el.innerHTML = '';
    this.collection.each(function(model) {
      var view = new ShoppingcartitemView({model: model});
      this.el.append(view.render().el);
    }.bind(this));
    return this;
	},
});

var ShoppingcartitemView = Backbone.View.extend({
  className: 'item',
  template: _.template(document.getElementById('model-shoppingcart-template').innerHTML),
  render: function() {
    this.el.innerHTML = '';
		this.el.innerHTML = this.template(this.model.attributes);
    return this;
	},
  events: {
    'click img': 'open',
    'change input': 'amount',
    'click #remove': 'delete',
  },
  open: function() {
    this.model.open();
  },
  amount: function(e) {
    this.model.set('amount', e.target.value);
  },
  delete: function() {
    this.el.remove();
    this.model.remove();
    User.set('shoppingcart', User.get('shoppingcart')-1);
  },
});
