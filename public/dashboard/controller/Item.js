var Items = Backbone.View.extend({
	id: 'items',
	template: _.template(document.getElementById('items-template').innerHTML),
	initialize: function() {
		this.render();
		this.getItems((items) => {
			new ListItemView({
				el: this.el.querySelector('#items'),
				collection: items,
			});
		});
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template();
		this.el.querySelector('#toitems').setAttribute('active', true);
		return this;
	},
	events: {
		'click a#new': 'new',
	},
	getItems: function(callback) {
		Socket.emit('items.get');
		Socket.once('items.get', (data) => {
			var items = new Backbone.Collection;
			for (let entry of data) {
				var model = new ItemModel(entry);
				items.add(model);
			}
			return callback(items);
		});
	},
	new: function() {
		Socket.emit('items.new');
		Socket.once('items.new', (data) => {
			var model = new ItemModel(data);
			var site = new Item({
				model: model,
			});
			new Site().el.append(site.el);
		});
	}
});

var Item = Backbone.View.extend({
	id: 'item',
	template: _.template(document.getElementById('item-template').innerHTML),
	initialize: function() {
		this.render();
		return this;
	},
	render: function() {
		this.el.innerHTML = '';
		this.el.innerHTML = this.template(this.model.attributes);
		this.el.querySelector('#toitems').setAttribute('active', true);
		Backbone.history.navigate('dashboard/item', false);
		return this;
	},
	events: {
		'change input#input': 'input',
		'change textarea#input': 'input',
		'change input#attr': 'attr',
		'click button#send': 'send',
		'click button#remove': 'delete',
	},
	input: function(e) {
		this.model.set(e.target.name, e.target.value);
	},
	attr: function(e) {
		var all = Array.prototype.slice.call(this.el.querySelectorAll('#attr'));
		var array = this.model.get('attributes');
		array[all.indexOf(e.target)] = e.target.value;
		this.model.set('attributes', array);
	},
	send: function() {
		Socket.emit('item.change', this.model.attributes);
		var site = new Items();
		new Site().el.append(site.el);
	},
	delete: function() {
		if (!confirm('Do you want to delete this?')) return;
		Socket.emit('item.remove', this.model.get('_id'));
		var site = new Items();
		new Site().el.append(site.el);
	}
});
