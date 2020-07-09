var ObjectID = require('mongodb').ObjectID;
var crypto = require('crypto');
var DB = require('../database/user');

var hash = (data) => {
	var salt = new Date();
	var hashed = crypto.createHash('md5').update(salt + data).digest('hex');
	return hashed;
}


this.session = (data, callback) => {
	if (!data || (ObjectID.isValid(data._id) == false)) return this.new((User) => {
		return callback(User);
	});
	DB.get({_id: data._id, session: data.session}, (User) => {
		if (!User) return this.new((User) => {
			return callback(User);
		});
		User.set('session', hash(User._id));
		User.save();
		return callback(User);
	});
}

this.get = (by, callback) => {
	DB.get(by, (User) => {
		return callback(User);
	});
}

this.new = (callback) => {
	DB.new((User) => {
		return callback(User);
	});
}
