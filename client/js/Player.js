var Player = Backbone.View.extend({
	className: "player",
	initialize: function(options) {
		this.playerConfig = options.player;
		this.myPieces = options.my_pieces;
		this.pieces = [];
		this.render();
	},
	
	render: function() {
		var $el = this.$el;
		var is_white = this.playerConfig.is_white;
		this.pieces = _.map(this.playerConfig.pieces,
			function(value) {
				var piece = new Piece({name: value.id, position: value.position, is_white: is_white});
				$el.append(piece.$el);
				return piece;
			}
		);
		
		this.$el.toggleClass("my-pieces", this.myPieces);
	}
});