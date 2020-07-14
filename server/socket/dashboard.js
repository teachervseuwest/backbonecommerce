var Users = require('./user');
var Items = require('./item');
var Shoppingcart = require('./shoppingcart');
var Orders = require('./order');
var Stripe = require('./stripe');

module.exports = (socket) => {
	//-----Graph-----//
	socket.on('graph.users', (date) => {
		Users.graph(date, (data) => {
			socket.emit('graph.users', data);
		});
	});
	socket.on('graph.orders', (date) => {
		Orders.graph(date, (data) => {
			socket.emit('graph.orders', data);
		});
	});
	//-----Items-----//
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
	//-----Orders-----//
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
