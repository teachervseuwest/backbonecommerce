var mongoose = require('mongoose');
var Shoppingcart = mongoose.model('Shoppingcart');

this.get = (by, callback) => {
	Shoppingcart.find(by).
	populate('item').
	exec((err, result) => {
		if (err) return console.error(err);
		return callback(result);
	});
}

this.new = (user, item, callback) => {
	var shoppingcart = new Shoppingcart({
		user: user,
		item: item,
	});
	shoppingcart.save((err, entry) => {
		if (err) return console.error(err);
		return callback(entry);
	});
}

this.remove = (by) => {
	Shoppingcart.findOneAndRemove(by).
	exec((err) => {
		if (err) return console.error(err);
	});
}

this.empty = (by, callback) => {
	Shoppingcart.deleteMany(by).
	exec((err, result) => {
		if (err) return console.error(err);
		return callback(result);
	});
}


this.count = (by, callback) => {
	Shoppingcart.countDocuments(by, (err, amount) => {
    if (err) return console.error(err);
    return callback(amount);
  });
}
