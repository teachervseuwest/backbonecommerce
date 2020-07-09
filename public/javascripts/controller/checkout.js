var Checkout = Backbone.View.extend({
	id: 'checkout',
	template: _.template(document.getElementById('checkout-template').innerHTML),
	initialize: function() {
		Backbone.history.navigate('checkout', false);
		this.model = User;
		this.render();
		this.payment();
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template({
			user: this.model.attributes,
			shoppingcart: this.collection,
		});
		return this;
	},
	events: {
		'click #navi': 'navi',
		'click a#toshipping': 'shipping',
		'click button#submit': 'submit',
	},
	navi: function() {
		var el = this.el.querySelector('.navi');
		if (el.style.display == 'grid') return el.style.display = 'none';
		else return el.style.display = 'grid';
	},
	shipping: function() {
		var site = new Shipping({
			collection: this.collection,
		});
		new Site().el.append(site.el);
	},
	payment: function() {
		Socket.emit('payment.stripe');
		Socket.once('payment.stripe', (data) => {
			this.Stripe = Stripe(data.publishableKey);
			var elements = this.Stripe.elements();
			this.stripe = data;
			this.card = elements.create('card', {
				hidePostalCode: true,
				style: {
					base: {
						color: '#fff',
						fontSize: '18px',
					}
				}
			});
			this.card.mount('#card-element');
			this.card.on('change', function(event) {
				var displayError = document.getElementById('card-errors');
				if (event.error) {
					displayError.textContent = event.error.message;
				} else {
					displayError.textContent = '';
				}
			});
		});
	},
	submit: function(e) {
		e.preventDefault();
		if (e.target.getAttribute('inactive') == 'true') return;
		e.target.setAttribute('inactive', true);
	  this.Stripe.confirmCardPayment(this.stripe.clientSecret, {
	    payment_method: {
	      card: this.card,
	      //billing_details: {this.model.attributes},
	    }
	  }).then((result) => {
			e.target.removeAttribute('inactive');
			if (result.error) return;
	    if (result.paymentIntent.status === 'succeeded') {
				Socket.emit('payment.submit');
				User.set('shoppingcart', 0);
				Backbone.history.navigate('thanks', true);
			}
	  });
	},
});
