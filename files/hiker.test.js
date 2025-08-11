"use strict";

import moveRover from "./hiker";

const testCases = [
  {
    scenario: "valid",
    input: ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
    expectedOutput: ["1 3 N", "5 1 E"],
  },
  {
    scenario: "boundsWithTurning",
    input: ["5 5", "1 2 N", "MMMMMMMMM", "3 3 E", "MMRMMRMRRM"],
    expectedOutput: ["5 3 S", "5 1 E"],
  },
  {
    scenario: "southBoundaryHandling",
    input: ["5 5", "2 0 S", "M"],
    expectedOutput: ["1 0 W"],
  },
  {
    scenario: "westBoundaryHandling", 
    input: ["5 5", "0 2 W", "M"],
    expectedOutput: ["0 3 N"],
  },
  {
    scenario: "turnInstructions",
    input: ["5 5", "2 2 N", "LR"],
    expectedOutput: ["2 2 N"],
  },
];

describe("answer", () => {
  testCases.forEach((testCase) => {
    it(testCase.scenario, () => {
      expect(moveRover(testCase.input)).toEqual(testCase.expectedOutput);
    });
  });
});
