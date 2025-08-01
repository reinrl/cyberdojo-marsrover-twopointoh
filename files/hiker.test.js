"use strict";

import moveRover from "./hiker";

const testCases = [
  {
    scenario: "valid",
    input: ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    expectedOutput: ["1 3 N", "5 1 E"],
  },
  {
    scenario: "noGravity",
    input: ["5 5", "1 2 N", "MMMMMMMMM", "3 3 E", "MMRMMRMRRM"],
    expectedOutput: ["Ran out of gravity :{", "5 1 E"],
  },
];

describe("answer", () => {
  testCases.forEach((testCase) => {
    it(testCase.scenario, () => {
      expect(moveRover(testCase.input)).toEqual(testCase.expectedOutput);
    });
  });
});
