const stripe = require('stripe')(_Config.stripe_secretkey);

this.pay = async (Cart, callback) => {
	var total = 0;
	for (let item of Cart) {
		total += item.amount*item.item.price*100;
	}
	if (total <= 0) return;
	const paymentIntent = await stripe.paymentIntents.create({
	  amount: total,
	  currency: 'eur',
	  // Verify your integration in this guide by including this parameter
	  metadata: {integration_check: 'accept_a_payment'},
	});
	return callback(paymentIntent);
}

this.check = async (id, callback) => {
	const intent = await stripe.paymentIntents.retrieve(id);
	if (intent.status === 'succeeded') return callback();
}
