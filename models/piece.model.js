export class Piece {
  name = '';
  constructor(color) {
    this.color = color;
  }
  canMove(from, to) {
    return true;
  }
}
