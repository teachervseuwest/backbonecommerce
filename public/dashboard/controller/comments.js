var Comments = Backbone.View.extend({
	id: 'comments',
	template: _.template(document.getElementById('comments-template').innerHTML),
	initialize: function() {
		this.render();
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template();
		this.el.querySelector('#tocomments').setAttribute('active', true);
		return this;
	},
	events: {
	},
});
