var Player = Backbone.View.extend({
	className: "player",
	initialize: function(options) {
		this.playerConfig = options.player;
		this.myPieces = options.my_pieces;
		this.pieces = [];
		this.selectedPiece = null;
		this.render();
	},
	
	render: function() {
		this.pieces = _.map(this.playerConfig.pieces,
			function(value) {
				var piece = new Piece(
					{
						name: value.id,
						position: value.position,
						is_white: this.playerConfig.is_white,
						my_piece: this.myPieces
					}
				);
				
				if (this.myPieces) {
					piece.on("selected", this.selectPiece.bind(this, piece), this);
				}
				this.$el.append(piece.$el);
				return piece;
			}.bind(this)
		);
		
		this.$el.toggleClass("my-pieces", this.myPieces);
	},
	
	selectPiece: function(piece) {
		if (this.selectedPiece !== null &&
			this.selectedPiece !== piece) {
			this.selectedPiece.removeSelected();
		}
		
		this.selectedPiece = piece;
		this.board.determineMoves(piece)
	},
	
	setBoard: function(board) {
		this.board = board;
	}
});