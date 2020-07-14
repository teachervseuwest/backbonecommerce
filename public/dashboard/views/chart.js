var ChartView = Backbone.View.extend({
  options: {day:'numeric', month:'short'},
  settings: {
      type: 'line',
      data: {
          labels: [],
          datasets: []
      },
      options: {
          legend: {
            display: true
          },
          scales: {
              yAxes: [{
                  ticks: {
                      precision: 0,
                      suggestedMax: 50,
                      beginAtZero: true
                  }
              }]
          }
      }
  },
  initialize: function() {
    this.chart = new Chart(this.el, this.settings);
    return this;
  },
  render: function(data) {
    this.el.innerHTML = '';
    return this;
	},
  setAxes: function(date) {
    var span = new Array;
    var today = new Date(date);
    var length = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
    for (let i = -1; i < length; i++) {
      var day = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i);
      if (day > new Date) return this.settings.data.labels = span;
      day = day.toLocaleDateString('en-US', this.options);
      span.push(day);
    }
    this.settings.data.labels = span;
  },
  setData: function(data, dataset) {
    var labels = this.chart.data.labels;
		var array = Array(labels.length).fill(0);
		for (let i of data) {
			var day = new Date(i.date).toLocaleDateString('en-US', this.options);
			if (labels.indexOf(day) > -1) array[labels.indexOf(day)] = array[labels.indexOf(day)]+1;
		}
    dataset.data = array;
    return this.chart.data.datasets.push(dataset);
  },
  update: function(data, dataset) {
    this.setData(data, dataset);
    this.chart.update();
  }
});
