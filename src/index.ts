import FunnyTerminal, { putStyle } from "funny-terminal";
import { getBlockShape, getShapeSize, processBlock } from "./data/blocks";
import { BlockColor } from "./enums/BlockColor";

export const WIDTH = 10;
export const HEIGHT = 14;
export const BLOCK = "██";

let tetris: Tetris[] = [];

const readline = new FunnyTerminal();
readline.setCursorShow(false);
readline.setKeypressDisable(true);
readline.setOnlyDirectionKeys(true);
readline.setASDWIsDirectionKeys(true);

readline
.addReadyListener(() => {
  tetris.push({ blockIndex: 0, shapeIndex: 1, position: [5, -4] });
  readline.coverMessage(getBoard());

  setInterval(() => {
    for (const item of tetris) {
      const shape = getBlockShape(item.blockIndex, item.shapeIndex);
      const image = processBlock(shape, BlockColor.PURPLE);
      const size = getShapeSize(image);
      item.position[1]++;
      if (item.position[1]+2 === HEIGHT-size[1]) item.position[1]--;
      readline.coverMessage(getBoard());
    }
  }, 1200);
})
.addActionListener(data => {
  readline.coverMessage(getBoard());
});

function getBoard() {
  let result: string[][] = [];
  for (let y = -1; y < HEIGHT+1; y++) {
    result.push([]);
    for (let x = -1; x < WIDTH+1; x++) {
      if (x === -1 || x === WIDTH || y === -1 || y === HEIGHT) result.at(-1)?.push(putStyle(BLOCK, BlockColor.BLACK));
      else result.at(-1)?.push(putStyle(BLOCK, BlockColor.WHITE));
    }
  }

  for (const item of tetris) {
    const shape = getBlockShape(item.blockIndex, item.shapeIndex);
    const image = processBlock(shape, BlockColor.PURPLE).slice(item.position[1] < 0 ? Math.abs(item.position[1]) : 0);
    for (const part of image) {
      for (const deepPart of part) {
        const partX = item.position[0] + deepPart.position[0];
        const partY = item.position[1] + deepPart.position[1];
        result[partY+1][partX] = deepPart.item;
      }
    }
  }

  return result.map(item => item.join('')).join('\n');
}

interface Tetris {
  blockIndex: number;
  shapeIndex: number;
  position: [number, number];
}
