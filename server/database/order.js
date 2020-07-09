var mongoose = require('mongoose');
var Orders = mongoose.model('Orders');

this.get = (by, callback) => {
	Orders.find(by).
	populate('user').
	sort('checked').
	sort('-date').
	exec((err, result) => {
		if (err) return console.error(err);
		return callback(result);
	});
}

this.getFull = (id, callback) => {
	Orders.findById(id).
	populate({
    path : 'shoppingcart',
    populate : {
      path : 'item'
    }
  }).
	exec((err, result) => {
		if (err) return console.error(err);
		return callback(result);
	});
}

this.new = (User, shoppingcart, payment, callback) => {
	var order = new Orders({
		user: User.get('_id'),
		shoppingcart: shoppingcart,
	});
	order.save((err, entry) => {
		if (err) return console.error(err);
		return callback(entry);
	});
}
