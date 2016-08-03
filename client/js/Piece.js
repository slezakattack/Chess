var Piece = Backbone.View.extend({
	className: "piece",
	events: {
		"click": "toggleSelect"
	},
	initialize: function(options) {
		var piece = options.piece
		this.name = piece.id;
		this.myPiece = options.my_piece;
		this.position = piece.position;
		this.selected = false;
		this.render(options.is_white);
	},
	
	render: function(is_white) {
		this.$el
			.addClass("piece")
			.toggleClass("white", is_white)
			.attr("data-name", this.name);
	},
	
	toggleSelect: function() {
		if (!this.myPiece) {
			return;
		}
		this.selected = !this.selected;
		this.$el.toggleClass("selected", this.selected);
		this.trigger("selected");
	},
	
	removeSelected: function() {
		this.selected = false;
		this.$el.removeClass("selected", this.selected);
	}
});