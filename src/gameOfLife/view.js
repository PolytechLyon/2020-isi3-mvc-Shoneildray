import { GAME_SIZE, CELL_SIZE } from "./constants";

export class View {

  constructor(modele) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
  }

  drawCell (x, y, value) {
    this.context.fillStyle = value;
    this.context.fillRect(x + CELL_SIZE * x, y + CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
  };

  initView () {
    document.getElementById("game").appendChild(this.canvas);
    this.canvas.setAttribute("height", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
    this.canvas.setAttribute("width", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
  };

  update (modele) {
    modele.state.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        this.drawCell(rowIndex, columnIndex, value);
      });
    });
  };

}