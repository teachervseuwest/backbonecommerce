var Cart = Backbone.View.extend({
	id: 'cart',
	template: _.template(document.getElementById('cart-template').innerHTML),
	initialize: function() {
		this.render();
		this.getCart((Collection) => {
			this.collection = Collection;
			this.listenTo(this.collection, 'change', this.setTotal);
			this.listenTo(this.collection, 'remove', this.setTotal);
			new ShoppingcartView({
				el: this.el.querySelector('#items'),
				collection: Collection,
			});
			this.setTotal();
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
		'click button#next': 'next',
	},
	navi: function() {
		var el = this.el.querySelector('.navi');
		if (el.style.display == 'grid') return el.style.display = 'none';
		else return el.style.display = 'grid';
	},
	getCart: function(callback) {
		Socket.emit('shoppingcart.get');
		Socket.once('shoppingcart.get', (data) => {
			var Collection = new ShoppingcartCollection;
			for (let entry of data) {
				var model = new ShoppingcartModel(entry);
				Collection.add(model);
			}
			return callback(Collection);
		});
	},
	setTotal: function() {
		this.el.querySelector('#totalprice').innerText = this.collection.total()+'€';
	},
	next: function() {
		User.check((err) => {
			if (err) return this.shipping();
			else return this.checkout();
		});
	},
	shipping: function() {
		var site = new Shipping({
			collection: this.collection,
		});
		new Site().el.append(site.el);
	},
	checkout: function() {
		var site = new Checkout({
			collection: this.collection,
		});
		new Site().el.append(site.el);
	},
});
