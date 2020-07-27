var Index = Backbone.View.extend({
	id: 'index',
	template: _.template(document.getElementById('index-template').innerHTML),
	options: {month: 'long', year: 'numeric'},
	date: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
	initialize: function() {
		this.render();
		this.chart = new ChartView({
			el: this.el.querySelector('#graph'),
		});
		this.setChart(this.date);
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template({date: this.date});
		this.el.querySelector('#todashboard').setAttribute('active', true);
		return this;
	},
	events: {
		'click i#left': 'left',
		'click i#right': 'right',
	},
	left: function() {
		this.date = new Date(this.date.getFullYear(), this.date.getMonth()-1, 2);
		this.el.querySelector('#month').innerText = this.date.toLocaleString('en-US', this.options);
		this.setChart(this.date);
	},
	right: function() {
		this.date = new Date(this.date.getFullYear(), this.date.getMonth()+1, 2);
		this.el.querySelector('#month').innerText = this.date.toLocaleString('en-US', this.options);
		this.setChart();
	},
	setChart: function(date) {
		this.chart.chart.data.datasets = [];
		this.chart.setAxes(this.date);
		this.getUsers((data) => {
			this.chart.update(data, {
				label: 'New users',
				data: [],
				backgroundColor: 'transparent',
				borderColor: 'rgba(52, 161, 202, 1)',
				pointBackgroundColor: 'rgba(52, 161, 202, 0.2)',
				borderWidth: 2,
				lineTension: 0,
			});
		});
		this.getOrders((data) => {
			this.chart.update(data, {
				label: 'Orders',
				data: [],
				backgroundColor: 'transparent',
				borderColor: 'rgba(202, 61, 61, 1)',
				pointBackgroundColor: 'rgba(202, 61, 61, 0.2)',
				borderWidth: 2,
				lineTension: 0,
			});
		});
	},
	getUsers: function(callback) {
		Socket.emit('d.graph.users', this.date);
		Socket.once('d.graph.users', (data) => {
			return callback(data);
		});
	},
	getOrders: function(callback) {
		Socket.emit('d.graph.orders', this.date);
		Socket.once('d.graph.orders', (data) => {
			return callback(data);
		});
	},
});
