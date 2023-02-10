import FunnyTerminal, { putStyle } from "funny-terminal";
import { Block } from "./enums/Block";

const WIDTH = 10;
const HEIGHT = 14;
const BLOCK = "██";

const readline = new FunnyTerminal();
readline.setCursorShow(false);
readline.setKeypressDisable(true);
readline.setOnlyDirectionKeys(true);
readline.setASDWIsDirectionKeys(true);

readline
.addReadyListener(() => {
  readline.coverMessage(getBoard());
})
.addActionListener(data => {
  readline.coverMessage(getBoard());
});

function getBoard() {
  let result = '';
  for (let y = -1; y < HEIGHT+1; y++) {
    for (let x = -1; x < WIDTH+1; x++) {
      if (x === -1 || x === WIDTH || y === -1 || y === HEIGHT) result += putStyle(BLOCK, Block.BLACK);
      else result += putStyle(BLOCK, Block.WHITE);
    }
    result += '\n';
  }

  return result;
}
