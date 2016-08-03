var ChessBoard = Backbone.View.extend({
	className: "board",
	
	initialize: function(options) {
		this.selectedPiece = null;
		this.render();
	},
	
	render: function() {
		this.$el.html(_.template($("#chessboard-template").html()), {});
		this.renderTiles();
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
		var player1 = this.drawPieces(boardConfig.player1, true);
		var player2 = this.drawPieces(boardConfig.player2, false);
		this.pieces = _.flatten(player1, player2);
	},
	
	drawPieces: function(player, myPiece) {
		return _.map(player.pieces,
			function(piece) {
				var piece = new Piece(
					{
						piece: piece,
						is_white: player.is_white,
						el: "#" + piece.position,
						my_piece: myPiece
					});
				if (myPiece) {
					piece.on("selected", this.onSelectPiece.bind(this, piece));
				}
			},
			this);
	},
	
	onSelectPiece: function(piece) {
		if (this.selectedPiece !== null &&
			this.selectedPiece !== piece) {
			this.selectedPiece.removeSelected();
		}
		
		this.selectedPiece = piece;
		//this.board.determineMoves(piece)
	},
	
	setTurn: function(yourTurn) {
		this.$el.toggleClass("your-turn", yourTurn);
	},
	
	setPlayers: function(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
		this.$('.pieces').append(this.player1.$el);
		this.$('.pieces').append(this.player2.$el);
		this.player1.setBoard(this);
	}
});