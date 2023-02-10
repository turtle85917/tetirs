import FunnyTerminal, { putStyle } from "funny-terminal";
import { BlockColor } from "./enums/BlockColor";
import blocks, { processBlock } from "./data/blocks";

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
  tetris.push({ blockIndex: 6, shapeIndex: 0, position: [5, 5] });
  readline.coverMessage(getBoard());
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
    const currentBlock = blocks[item.blockIndex];
    const image = processBlock(currentBlock.defaultShape, BlockColor.PURPLE);
    for (const part of image) {
      for (const deepPart of part) {
        const partX = item.position[0] + deepPart.position[0];
        const partY = item.position[1] + deepPart.position[1];
        result[partY][partX] = deepPart.item;
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
