import { putStyle } from "funny-terminal";
import { BLOCK } from "..";

const blocks: Block[] = [
  {
    defaultShape: "1111000000000000",
    turns: [
      "1111000000000000",
      "1000100010001000",
      "0000000000001111",
      "0001000100010001"
    ]
  },
  {
    defaultShape: "010111000",
    turns: [
      "010111000",
      "100110100",
      "000111010",
      "001011001"
    ]
  },
  {
    defaultShape: "1111",
    turns: [
      "1111",
      "1111",
      "1111",
      "1111"
    ]
  },
  {
    defaultShape: "100111000",
    turns: [
      "100111000",
      "110100100",
      "000111001",
      "001001011"
    ]
  },
  {
    defaultShape: "001111000",
    turns: [
      "001111000",
      "100100110",
      "000111100",
      "011001001"
    ]
  },
  {
    defaultShape: "110011000",
    turns: [
      "110011000",
      "010110100",
      "000110011",
      "001011010"
    ]
  },
  {
    defaultShape: "011110000",
    turns: [
      "011110000",
      "100110010",
      "000011110",
      "010011001"
    ]
  }
];

export default blocks;

export function processBlock(shape: string, color: number) {
  const maxLength = Math.sqrt(shape.length);
  const chunk = shape.split(new RegExp(`\\B(?=(?:\\d{${maxLength}})+(?!\\d))`));
  let result = '';
  for (const item of chunk) {
    for (let i = 0; i < item.length; i++) result += item[i] === '1' ? putStyle(BLOCK, color) : '  ';
    result += '\n';
  }

  return result;
}

interface Block {
  defaultShape: string;
  turns: string[];
}
