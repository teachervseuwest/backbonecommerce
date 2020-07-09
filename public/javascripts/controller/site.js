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
		'click #toindex': () => Backbone.history.navigate('', true),
		'click #toshop': () => Backbone.history.navigate('shop', true),
		'click #tocart': () => Backbone.history.navigate('cart', true),
	}
});
