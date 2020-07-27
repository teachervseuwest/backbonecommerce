var Router = Backbone.Router.extend({
	routes: {
		'dashboard/': 'login',
		'dashboard/index': 'index',
		'dashboard/items': 'items',
		'dashboard/item': 'items',
		'dashboard/orders': 'orders',
		'dashboard/order': 'orders',
		'dashboard/comments': 'comments',
	},
	login: () => {
		var site = new Login();
		new Site().el.append(site.el);
	},
	index: () => {
		if (dashboard != true) return Backbone.history.navigate('dashboard/', true);
		var site = new Index();
		new Site().el.append(site.el);
	},
	items: () => {
		if (dashboard != true) return Backbone.history.navigate('dashboard/', true);
		var site = new Items();
		new Site().el.append(site.el);
	},
	orders: () => {
		if (dashboard != true) return Backbone.history.navigate('dashboard/', true);
		var site = new Orders();
		new Site().el.append(site.el);
	},
	comments: () => {
		if (dashboard != true) return Backbone.history.navigate('dashboard/', true);
		var site = new Comments();
		new Site().el.append(site.el);
	},
});

new Router;
Backbone.history.start({pushState: true});
