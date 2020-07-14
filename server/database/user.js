var mongoose = require('mongoose');
var Users = mongoose.model('Users');

this.get = (by, callback) => {
	Users.findOne(by).
	select('-session').
	exec((err, user) => {
		if (err) return console.error(err);
		return callback(user);
	});
}

this.getId = (date, callback) => {
	var from = new Date(date);
	var to = new Date(from.getFullYear(), from.getMonth()+1);
	Users.find({
		date: {$gt: from, $lt: to}
	}).
	select('date').
	sort('-date').
	exec((err, result) => {
		if (err) return console.error(err);
		return callback(result);
	});
}

this.new = (callback) => {
	var user = new Users();
	user.save((err, entry) => {
		if (err) return console.error(err);
		return callback(entry);
	});
}

this.count = (callback) => {
	Users.estimatedDocumentCount((err, result) => {
    if (err) return console.error(err);
    return callback(result);
  });
}
