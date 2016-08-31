var Rules = {
	checkLegalMoves: function(piece, pieces) {
		switch(piece.name) {
			case "knight":
				Rules.determineKnight(piece, pieces);
				break;
			case "rook":
				Rules.determineRook(piece, pieces);
				break;
			case "bishop":
				Rules.determineBishop(piece, pieces);
				break;
			case "queen":
				Rules.determineQueen(piece, pieces);
				break;
		}
	},
	
	determineRook: function(piece, pieces) {
		var x = parseInt(piece.position[0]);
		var y = parseInt(piece.position[1]);
		Rules.scanHorizontally(x, y, pieces);
		Rules.scanVertically(x, y, pieces);
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
				Rules.maybeAvailable(pos.x, pos.y, Rules.inBounds(pos.x, pos.y) && !Rules.occupiedByMe(pos.x, pos.y, pieces));
			},
			Rules
		);
	},
	
	determineBishop: function(piece, pieces) {
		var x = parseInt(piece.position[0]);
		var y = parseInt(piece.position[1]);
		Rules.scanDiagonally(x, y, pieces);
	},
	
	determineQueen: function(piece, pieces) {
		var x = parseInt(piece.position[0]);
		var y = parseInt(piece.position[1]);
		Rules.scanHorizontally(x, y, pieces);
		Rules.scanVertically(x, y, pieces);
		Rules.scanDiagonally(x, y, pieces);
	},
	
	maybeAvailable: function(x, y, condition) {
		$("#".concat(x,y)).toggleClass("available", condition);
	},
	
	inBounds: function(x, y) {
		return x >= 0 && x <= 7 && y >= 0 && y <=7;
	},
	
	occupied: function(x, y, pieces) {
		var pos = "".concat(x, y);
		return _.has(pieces, pos);
	},
	
	maybeOccupier: function(x, y, pieces) {
		var pos = "".concat(x, y);
		return (_.has(pieces, pos)) ? pieces[pos] : null;
	},
	
	occupiedByEnemy: function(x, y, pieces) {
		var pos = "".concat(x, y);
		return _.has(pieces, pos) && !pieces[pos].myPiece;
	},
	
	occupiedByMe: function(x, y, pieces) {
		var pos = "".concat(x, y);
		return _.has(pieces, pos) && !!pieces[pos].myPiece;
	},
	
	scanHorizontally: function(x, y, pieces) {
		for (var i = x; i < 8; i++) {
			var maybeOccupier = Rules.maybeOccupier(i, y, pieces);
			if (maybeOccupier !== null && i !== x) {
				Rules.maybeAvailable(i, y, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(i, y, i !== x);
		}
		
		for (var i = x; i >= 0; i--) {
			var maybeOccupier = Rules.maybeOccupier(i, y, pieces);
			if (maybeOccupier !== null && i !== x) {
				Rules.maybeAvailable(i, y, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(i, y, i !== x);
		}
	},
	
	scanVertically: function(x, y, pieces) {
		for (var j = y; j < 8; j++) {
			var maybeOccupier = Rules.maybeOccupier(x, j, pieces);
			if (maybeOccupier !== null && j !== y) {
				Rules.maybeAvailable(x, j, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(x, j, j !== y);
		}
		
		for (var j = y; j >= 0; j--) {
			var maybeOccupier = Rules.maybeOccupier(x, j, pieces);
			if (maybeOccupier !== null && j !== y) {
				Rules.maybeAvailable(x, j, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(x, j, !Rules.occupied(x, j, pieces) && j !== y);
		}
	},
	
	scanDiagonally: function(x, y, pieces) {
		for (var i = x, j = y; i < 8 && j < 8; j++, i++) {
			var maybeOccupier = Rules.maybeOccupier(i, j, pieces);
			if (maybeOccupier !== null && j !== y && i !== x) {
				Rules.maybeAvailable(i, j, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(i, j, j !== y && i !== x);
		}
		
		for (var i = x, j = y; i >= 0 && j >= 0; j--, i--) {
			var maybeOccupier = Rules.maybeOccupier(i, j, pieces);
			if (maybeOccupier !== null && j !== y && i !== x) {
				Rules.maybeAvailable(i, j, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(i, j, j !== y && i !== x);
		}
		
		for (var i = x, j = y; i < 8 && j >= 0; j--, i++) {
			var maybeOccupier = Rules.maybeOccupier(i, j, pieces);
			if (maybeOccupier !== null && j !== y && i !== x) {
				Rules.maybeAvailable(i, j, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(i, j, j !== y && i !== x);
		}
		
		for (var i = x, j = y; i >= 0 && j < 8; j++, i--) {
			var maybeOccupier = Rules.maybeOccupier(i, j, pieces);
			if (maybeOccupier !== null && j !== y && i !== x) {
				Rules.maybeAvailable(i, j, !maybeOccupier.myPiece);
				break;
			}
			Rules.maybeAvailable(i, j, j !== y && i !== x);
		}
	}
}