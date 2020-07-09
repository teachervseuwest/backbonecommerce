var ObjectID = require('mongodb').ObjectID;
var DB = require('../database/shoppingcart');

this.get = (by, callback) => {
	DB.get(by, (result) => {
		return callback(result);
	});
}

this.remove = (User, by, callback) => {
	DB.remove(by);
	DB.count({
		user: User.get('_id'),
		finished: false,
	}, (amount) => {
		User.set('shoppingcart', amount-1);
		User.save();
	});
}

this.new = (User, id) => {
	DB.count({
		user: User.get('_id'),
		item: id,
		finished: false
	}, (amount) => {
		if (amount > 0) return;
		DB.new(User.get('_id'), id, (entry) => {});
		DB.count({
			user: User.get('_id'),
			finished: false
		},(amount) => {
			User.set('shoppingcart', amount+1);
			User.save();
		});
	});
}

this.empty = (User, Cart) => {
	User.set('shoppingcart', 0);
	User.save();
	for (let Entry of Cart) {
		Entry.set('finished', true);
		Entry.save();
	}
}
