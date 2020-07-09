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
		return this;
	},
	events: {
		'click #navi': 'navi',
	},
	navi: function() {
		var el = this.el.querySelector('.navi');
		if (el.style.display == 'grid') return el.style.display = 'none';
		else return el.style.display = 'grid';
	},
	count: function() {
		var value = this.el.querySelector('#count').innerText;
		return this.el.querySelector('#count').innerText = Number(value)+1;
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
