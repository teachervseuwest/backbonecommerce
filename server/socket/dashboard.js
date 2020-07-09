var Users = require('./user');
var Items = require('./item');
var Shoppingcart = require('./shoppingcart');
var Orders = require('./order');
var Stripe = require('./stripe');

module.exports = (socket) => {
	socket.on('items.new', () => {
		Items.new((Item) => {
			socket.emit('items.new', Item);
		});
	});
	socket.on('item.change', (data) => {
		Items.update(data._id, data, (Item) => {});
	});
	socket.on('item.remove', (id) => {
		Items.remove(id, (Item) => {});
	});
	socket.on('orders.get', () => {
		Orders.get({finished: false}, (orders) => {
			socket.emit('orders.get', orders)
		});
	});
	socket.on('order.get', (id) => {
		Orders.getFull(id, (order) => {
			socket.emit('order.get', order);
		});
	});
	socket.on('order.check', (id) => {
		Orders.check(id);
	});
};
