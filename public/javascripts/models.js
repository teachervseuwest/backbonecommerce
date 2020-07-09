var Socket = io();

Socket.on('connect', () => {
	var user;
	if (localStorage.getItem('me')) user = JSON.parse(localStorage.me);
	Socket.emit('session', user);
	Socket.on('user', (user) => {
		var data = JSON.stringify(user);
		localStorage.setItem('me', data);
		User = new UserModel(user);
	});
});

var UserModel = Backbone.Model.extend({
	initialize: function() {
		this.on('change:firstname', this.save);
		this.on('change:lastname', this.save);
		this.on('change:email', this.save);
		this.on('change:street', this.save);
		this.on('change:town', this.save);
		this.on('change:zip', this.save);
	},
	save: function(e) {
		Socket.emit('user.set', e.changed);
		var data = JSON.stringify(this.attributes);
		localStorage.setItem('me', data);
	},
	check: function(callback) {
		var err = false;
		_.each(this.attributes, (value, key) => {
		  if (value === '') {
				err = true;
				return callback(key);
			}
		});
		if (err == false) return callback();
	},
	defaults: {
		firstname: '',
		lastname: '',
		email: '',
		street: '',
		town: '',
		zip: '',
		country: 'Germany',
		shoppingcart: 0,
	},
});
var User = new UserModel();
if (localStorage.getItem('me')) User = new UserModel(JSON.parse(localStorage.me));

var ItemModel = Backbone.Model.extend({
	defaults: {
		name: '',
		image: '',
		info: '',
		attributes: [],
		price: 0,
	},
	open: function() {
		Backbone.history.navigate('item/'+this.get('_id'), true);
	}
});

var ShoppingcartModel = Backbone.Model.extend({
	initialize: function() {
		this.on('change:amount', this.amount);
	},
	defaults: {
		amount: '',
		item: ItemModel,
	},
	open: function() {
		Backbone.history.navigate('item/'+this.get('item')._id, true);
	},
	amount: function() {
		Socket.emit('shoppingcart.amount', this);
	},
	remove: function() {
		Socket.emit('shoppingcart.remove', this.get('_id'));
		this.destroy();
	}
});
