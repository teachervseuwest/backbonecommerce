var Users = require('./user');
var Items = require('./item');
var Shoppingcart = require('./shoppingcart');
var Orders = require('./order');
var Stripe = require('./stripe');

module.exports = (socket) => {
	//-----Graph-----//
	socket.on('d.graph.users', (date) => {
		Users.graph(date, (data) => {
			socket.emit('d.graph.users', data);
		});
	});
	socket.on('d.graph.orders', (date) => {
		Orders.graph(date, (data) => {
			socket.emit('d.graph.orders', data);
		});
	});
	//-----Items-----//
	socket.on('d.items.get', () => {
		Items.get({}, (data) => {
			socket.emit('d.items.get', data);
		});
	});
	socket.on('d.items.new', () => {
		Items.new((Item) => {
			socket.emit('d.items.new', Item);
		});
	});
	socket.on('d.item.change', (data) => {
		Items.update(data._id, data, (Item) => {});
	});
	socket.on('d.item.remove', (id) => {
		Items.remove(id, (Item) => {});
	});
	//-----Orders-----//
	socket.on('d.orders.get', () => {
		Orders.get({finished: false}, (orders) => {
			socket.emit('d.orders.get', orders)
		});
	});
	socket.on('d.order.get', (id) => {
		Orders.getFull(id, (order) => {
			socket.emit('d.order.get', order);
		});
	});
	socket.on('d.order.check', (id) => {
		Orders.check(id);
	});
};
