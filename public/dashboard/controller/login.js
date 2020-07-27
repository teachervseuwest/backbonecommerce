var dashboard = false;
var Login = Backbone.View.extend({
	id: 'login',
	template: _.template(document.getElementById('login-template').innerHTML),
	initialize: function() {
		this.model = new Backbone.Model();
		this.render();
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template();
		return this;
	},
	events: {
		'change input': 'input',
		'click button#send': 'send',
	},
	input: function(e) {
		this.model.set(e.target.name, e.target.value);
	},
	send: function() {
		Socket.emit('dashboard', this.model);
		Socket.once('dashboard', (data) => {
			if (data == false) return this.err();
			dashboard = true;
			Backbone.history.navigate('dashboard/index', true);
		});
	},
	err: function() {
		var err = this.el.querySelector('#err');
		err.innerText = 'Your credentials do not match!';
	}
});
