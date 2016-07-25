var ChessBoard = Backbone.View.extend({
	className: "board",
	template: _.template("<div class=\"inner-board\"><div class=\"tiles\"></div><div class=\"pieces\"></div></div>"),
	
	initialize: function(options) {
		this.player1 = options.player1;
		this.player2 = options.player2;
		this.render();
	},
	
	render: function() {
		this.$el.html(_.template($("#chessboard-template").html()), {});
		this.renderTiles();
		this.$('.pieces').append(this.player1.$el);
		this.$('.pieces').append(this.player2.$el);
	},
	
	renderTiles: function() {
		var red = false;
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				red = !red;
				this.renderTile(red, j, i);
			}
			red = !red;
		}
	},
	
	renderTile: function(red, x, y) {
		var $tile = $('<div>')
			.addClass('tile')
			.attr('id', "".concat(x, y))
			.offset({ top: y * 64, left: x * 64})
			.toggleClass('red', red);
		this.$('.tiles').append($tile);
	},
	
	drawBoard: function(boardConfig) {
	
	}
});