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
