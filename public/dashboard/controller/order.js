var Orders = Backbone.View.extend({
	id: 'orders',
	template: _.template(document.getElementById('orders-template').innerHTML),
	initialize: function() {
		this.render();
		this.getOrders((orders) => {
			new ListOrderView({
				el: this.el.querySelector('#orders'),
				collection: orders,
			});
		});
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template();
		this.el.querySelector('#toorders').setAttribute('active', true);
		return this;
	},
	events: {
	},
	getOrders: function(callback) {
		Socket.emit('orders.get');
		Socket.once('orders.get', (data) => {
			var orders = new Backbone.Collection;
			for (let entry of data) {
				var model = new OrderModel(entry);
				orders.add(model);
			}
			return callback(orders);
		});
	},
});

var Order = Backbone.View.extend({
	id: 'order',
	template: _.template(document.getElementById('order-template').innerHTML),
	initialize: function() {
		this.getOrder((order) => {
			this.model = order;
			this.render();
		});
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template(this.model.attributes);
		this.el.querySelector('#toorders').setAttribute('active', true);
		Backbone.history.navigate('dashboard/order', false);
		return this;
	},
	events: {
		'click button#check': 'check',
	},
	getOrder: function(callback) {
		Socket.emit('order.get', this.model.get('_id'));
		Socket.once('order.get', (data) => {
			var order = new OrderModel(data);
			return callback(order);
		});
	},
	check: function(e) {
		if (e.target.getAttribute('inactive') == 'true') return;
    e.target.setAttribute('inactive', true);
		Socket.emit('order.check', this.model.get('_id'));
	}
});
