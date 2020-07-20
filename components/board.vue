<template>
  <view class="board" :key="randomKey">
    <view class="next-pieces">
      <template v-for="(piece, index) in nextPieces">
        <image
          :key="index"
          :source="images[piece.color][piece.name]"
          class="next-pieces__image"
        />
      </template>
    </view>
    <view
      class="line"
      v-for="(line, lineIndex) in board.boardTable"
      :key="lineIndex"
    >
      <template v-for="(square, columnIndex) in line">
        <touchable-opacity
          class="square-touchable"
          :key="columnIndex"
          :on-press="
            function () {
              squarePress(lineIndex, columnIndex);
            }
          "
        >
          <view
            class="square"
            :class="[
              lineIndex % 2 === 0
                ? columnIndex % 2 === 0
                  ? 'w'
                  : 'b'
                : columnIndex % 2 === 0
                ? 'b'
                : 'w',
              isActiveSquare(lineIndex, columnIndex) ? 'active' : '',
            ]"
          >
            <image
              v-if="square"
              :style="{ width: '100%', height: '100%' }"
              :source="require('./../images/pieces/blue/k.png')"
            />
          </view>
        </touchable-opacity>
      </template>
    </view>
  </view>
</template>

<script>
import { Board } from "./../models/board.model";
import { Knight } from "./../models/knight.model";
import { Bishop } from "./../models/bishop.model";
import { Rook } from "./../models/rook.model";
import { Queen } from "./../models/queen.model";
import { King } from "./../models/king.model";

import { images } from "./../images/pieces/pieces";

export default {
  data() {
    return {
      board: new Board(8),
      activeSquare: {
        line: "",
        column: "",
      },
      colorsNumber: 5,
      nextPiecesNumber: 3,
      randomKey: 1,
      nextPieces: [],
      availablesColors: [
        "white",
        "black",
        "blue",
        "green",
        "red",
        "purple",
        "yellow",
      ],
      images: images,
    };
  },
  mounted() {
    this.generateNextPieces();
  },
  computed: {
    isSelectedSquare() {
      return this.activeSquare.line !== "" && this.activeSquare.column !== "";
    },
    getActivePiece() {
      return this.activeSquare
        ? this.board.boardTable[this.activeSquare.line][
            this.activeSquare.column
          ]
        : null;
    },
    boardTable() {
      return this.board.boardTable;
    },
  },
  methods: {
    squarePress(line, column) {
      const clickedSquare = { line: line, column: column };
      if (this.isSelectedSquare) {
        // if (getActivePiece && getActivePiece.canMove(this.board.boardTable, this.activeSquare, { line: line, column: column })) {
        if (this.board.makeMove(this.activeSquare, clickedSquare)) {
          this.clearActiveSquare();
          this.board.putPiecesOnEmptySquares(this.nextPieces);
          this.updateBoard();
          this.generateNextPieces();
        }
      } else {
        if (this.board.getPiece(clickedSquare)) {
          this.activeSquare = clickedSquare;
        }
      }
    },
    isActiveSquare(line, column) {
      return (
        this.activeSquare.line === line && this.activeSquare.column === column
      );
    },
    makeMove(currentSquare, newSquare) {
      this.board.boardTable[newSquare.line][
        newSquare.column
      ] = this.board.boardTable[currentSquare.line][currentSquare.column];
      this.activeSquare = { line: "", column: "" };
      this.clearSquare(currentSquare);
    },
    clearSquare(square) {
      this.board.boardTable[square.line][square.column] = null;
    },
    updateBoard() {
      this.randomKey++;
    },
    clearActiveSquare() {
      this.activeSquare.column = "";
      this.activeSquare.line = "";
    },
    createPiece(pieceNumber, color) {
      let piece = null;
      switch (pieceNumber) {
        case 0:
          piece = new Knight(color);
          break;
        case 1:
          piece = new Bishop(color);
          break;
        case 2:
          piece = new Rook(color);
          break;
        case 3:
          piece = new Queen(color);
          break;
        case 4:
          piece = new King(color);
          break;
      }
      console.log("piece", piece);
      return piece;
    },
    generateNextPieces() {
      this.nextPieces = [];
      for (let i = 0; i < this.nextPiecesNumber; i++) {
        const color = this.availablesColors[
          Math.floor(Math.random() * this.colorsNumber)
        ];
        const pieceNumber = Math.floor(Math.random() * 5);

        this.nextPieces.push(this.createPiece(pieceNumber, color));
      }
    },
  },
};
</script>

<style>
.next-pieces {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.board {
  border-width: 2px;
  border-color: brown;
  width: 100%;
}
.line {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}
.square-touchable {
  flex: 1;
}
.square {
  width: 100%;
  aspect-ratio: 1;
}
.w {
  background-color: white;
}
.b {
  background-color: brown;
}
.active {
  background-color: gray;
}
</style>
