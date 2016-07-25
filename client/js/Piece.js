var Piece = Backbone.View.extend({
	className: "piece",
	events: [],
	initialize: function(options) {
		this.name = options.name;
		this.position = options.position;
		this.render(options.is_white);
	},
	
	render: function(is_white) {
		this.$el
			.addClass(this.name)
			.toggleClass("white", is_white);
			
		this.setPosition(this.position);
	},
	
	setPosition(position) {
		this.position = position;
		var x = parseInt(position[0]);
		var y = parseInt(position[1]);
		this.$el.offset({top: y * 64, left: x * 64});
	}
});