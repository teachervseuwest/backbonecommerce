var Router = Backbone.Router.extend({
	routes: {
		'dashboard/': 'index',
		'dashboard/items': 'items',
		'dashboard/item': 'items',
		'dashboard/orders': 'orders',
		'dashboard/order': 'orders',
		'dashboard/comments': 'comments',
	},
	index: () => {
		var site = new Index();
		new Site().el.append(site.el);
	},
	items: () => {
		var site = new Items();
		new Site().el.append(site.el);
	},
	orders: () => {
		var site = new Orders();
		new Site().el.append(site.el);
	},
	comments: () => {
		var site = new Comments();
		new Site().el.append(site.el);
	},
});

new Router;
Backbone.history.start({pushState: true});
