var mongoose = require('mongoose');
var Items = mongoose.model('Items');

this.get = (by, callback) => {
	Items.find(by).
	exec((err, result) => {
		if (err) return console.error(err);
		return callback(result);
	});
}

this.new = (callback) => {
	var item = new Items();
	item.save((err, entry) => {
		if (err) return console.error(err);
		return callback(entry);
	});
}

this.update = (id, data, callback) => {
	Items.findByIdAndUpdate(mongoose.Types.ObjectId(id), {$set: data}).
	then((result) => {
		return callback(result);
	});
}

this.remove = (id, callback) => {
	Items.findByIdAndRemove(mongoose.Types.ObjectId(id)).
	then((result) => {
		return callback(result);
	});
}
