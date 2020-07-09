var ObjectID = require('mongodb').ObjectID;
var DB = require('../database/item');

this.get = (by, callback) => {
	DB.get(by, (Item) => {
		return callback(Item);
	});
}

this.new = (callback) => {
	DB.new((Item) => {
		return callback(Item);
	});
}

this.update = (id, data, callback) => {
	DB.update(id, data, (Item) => {
		return callback(Item);
	});
}

this.remove = (id, callback) => {
	DB.remove(id, (Item) => {
		return callback(Item);
	});
}
