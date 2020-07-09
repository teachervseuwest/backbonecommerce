const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstname: String,
	lastname: String,
	email: String,
	street: String,
	town: String,
	zip: String,
	country: {type: String, default: 'Germany'},
	shoppingcart: {type: Number, default: 0},
	session: {type: String, default: ''},
	language: {type: String, default: 'en'},
	ip: {type: Array, select: false},
	useragent: {type: String, select: false},
	dashboard: {type: Boolean, default: true},
});
mongoose.model('Users', UserSchema);

var ItemSchema = new Schema({
	name: String,
	image: String,
	info: String,
	attributes: Array,
	price: Number,
});
mongoose.model('Items', ItemSchema);

var ShoppingcartSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'Users'},
	item: {type: Schema.Types.ObjectId, ref: 'Items'},
	amount: {type: Number, default: 1},
	finished: {type: Boolean, default: false},
	date: {type: Date, default: Date.now},
});
mongoose.model('Shoppingcart', ShoppingcartSchema);

var OrderSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'Users'},
	shoppingcart: [{type: Schema.Types.ObjectId, ref: 'Shoppingcart'}],
	payment: String,
	checked: {type: Boolean, default: false},
	finished: {type: Boolean, default: false},
	date: {type: Date, default: Date.now},
});
mongoose.model('Orders', OrderSchema);

var LogSchema = new Schema({
	key: String,
	date: {type: Date, default: Date.now},
	data: {},
});
mongoose.model('Logs', LogSchema);
