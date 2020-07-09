var ObjectID = require('mongodb').ObjectID;
var DB = require('../database/order');

this.get = (by, callback) => {
	DB.get(by, (Orders) => {
		return callback(Orders);
	});
}

this.getFull = (id, callback) => {
	DB.getFull(id, (Order) => {
		return callback(Order);
	});
}

this.new = (User, Cart, payment, callback) => {
	var array = new Array;
	for (let item of Cart) {
		array.push(ObjectID(item.get('_id')));
	}
	DB.new(User, array, payment, (Order) => {
		return callback(Order);
	});
}
