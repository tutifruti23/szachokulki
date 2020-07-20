export class Board {
  nextPieces = [];
  constructor(size) {
    this.boardTable = [];
    for (let j = 0; j < size; j++) {
      this.boardTable.push([]);
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.boardTable[i].push(false);
      }
    }
    this.boardTable[1][1] = true;
  }

  isSquareEmpty(square) {
    return !this.boardTable[square.line][square.column];
  }

  isDifferentSquares(firstSquare, secondSquare) {
    return (
      parseInt(firstSquare.line) !== parseInt(secondSquare.line) ||
      parseInt(firstSquare.column) !== parseInt(secondSquare.column)
    );
  }

  putPiece(square, piece) {
    this.boardTable[square.line][square.column] = piece;
  }

  getPiece(square) {
    return this.boardTable[square.line][square.column];
  }

  clearSquare(square) {
    this.boardTable[square.line][square.column] = null;
  }

  movePiece(from, to) {
    this.putPiece(to, this.getPiece(from));
    this.clearSquare(from);
  }

  makeMove(from, to) {
    const piece = this.getPiece(from);

    if (piece && this.isDifferentSquares(from, to) && this.isSquareEmpty(to)) {
      this.movePiece(from, to);
      return true;
    }

    return false;
  }
  putPiecesOnEmptySquares(pieces) {
    const emptySquares = [];
    for (let i = 0; i < this.boardTable.length; i++) {
      for (let j = 0; j < this.boardTable[i].length; j++) {
        if (!this.boardTable[i][j]) {
          emptySquares.push({ line: i, column: j });
        }
      }
    }

    console.log('empty', emptySquares);

    if (emptySquares.length < pieces.length) {
      return false;
    }

    for (let i = 0; i < pieces.length; i++) {
      const randomSquare = emptySquares.splice(Math.floor(Math.random() * emptySquares.length), 1)[0];
      console.log('random square', randomSquare);
      this.putPiece(randomSquare, pieces[i]);
    }
    return true;
  }
}
