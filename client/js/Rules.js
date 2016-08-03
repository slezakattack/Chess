var Rules = {
	checkLegalMoves: function(piece, pieces) {
		switch(piece.name) {
			case "knight":
				Rules.determineKnight(piece, pieces);
				break;
		}
	},
	
	determineKnight: function(piece, pieces) {
		var x = parseInt(piece.position[0]);
		var y = parseInt(piece.position[1]);
		var moves = [
			{x: x + 1, y: y - 2},
			{x: x - 1, y: y - 2},
			{x: x + 2, y: y - 1},
			{x: x - 2, y: y - 1},
			{x: x + 1, y: y + 2},
			{x: x - 1, y: y + 2},
			{x: x + 2, y: y + 1},
			{x: x - 2, y: y + 1},
		];
		_.each(moves,
			function(pos) {
				Rules.maybeAvailable(pos.x, pos.y, Rules.inBounds(pos.x, pos.y) && !Rules.occupied(pos.x, pos.y, pieces));
			},
			Rules
		);
	},
	
	maybeAvailable: function(x, y, condition) {
		$("#".concat(x,y)).toggleClass("available", condition);
	},
	
	inBounds: function(x, y) {
		return x >= 0 && x <= 7 && y >= 0 && y <=7;
	},
	
	occupied: function(x, y, pieces) {
		var pos = "".concat(x, y);
		return _.some(pieces, function(piece) { return piece.position === pos && !!piece.myPiece; });
	}
}