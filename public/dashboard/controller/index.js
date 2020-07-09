var Index = Backbone.View.extend({
	id: 'index',
	template: _.template(document.getElementById('index-template').innerHTML),
	initialize: function() {
		this.render();
		this.getItems((items) => {
			this.listenTo(User, 'change:shoppingcart', this.count);
			new ItemsView({
				el: this.el.querySelector('#bottles'),
				collection: items,
			});
		});
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template();
		this.el.querySelector('#tostatistics').setAttribute('active', true);
		return this;
	},
	events: {
	},
	getItems: function(callback) {
		Socket.emit('items.get');
		Socket.once('items.get', (data) => {
			var items = new Backbone.Collection;
			for (let i = 0; i < 3; i++) {
				var model = new ItemModel(data[i]);
				items.add(model);
			}
			return callback(items);
		});
	},
});
