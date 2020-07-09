var OrderModel = Backbone.Model.extend({
	defaults: {
		shoppingcart: [],
		user: {},
		checked: false,
		finished: false,
		date: new Date(),
	},
	open: function() {
		Backbone.history.navigate('item/'+this.get('_id'), true);
	}
});
