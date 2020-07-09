var Site = Backbone.View.extend({
	el: '.site',
	initialize: function() {
		this.render();
		return this;
	},
	render: function() {
		window.scrollTo(0, 0);
		this.el.innerHTML = '';
		return this;
	},
	events: {
		'click #tostatistics': () => Backbone.history.navigate('dashboard/', true),
		'click #toitems': () => Backbone.history.navigate('dashboard/items', true),
		'click #toorders': () => Backbone.history.navigate('dashboard/orders', true),
	}
});
