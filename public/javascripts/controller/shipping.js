var Shipping = Backbone.View.extend({
	id: 'shipping',
	template: _.template(document.getElementById('shipping-template').innerHTML),
	initialize: function() {
		Backbone.history.navigate('shipping', false);
		this.model = User;
		this.render();
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template(this.model.attributes);
		return this;
	},
	events: {
		'click #navi': 'navi',
		'change input': 'input',
		'click button#next': 'next',
	},
	navi: function() {
		var el = this.el.querySelector('.navi');
		if (el.style.display == 'grid') return el.style.display = 'none';
		else return el.style.display = 'grid';
	},
	input: function(e) {
		e.target.removeAttribute('invalid');
		this.model.set(e.target.name, e.target.value);
	},
	next: function() {
		this.model.check((err) => {
			if (err) return this.el.querySelector('input[name='+err+']').setAttribute('invalid', true);
			else return this.checkout();
		});
	},
	checkout: function() {
		var site = new Checkout({
			collection: this.collection,
		});
		new Site().el.append(site.el);
	}
});
