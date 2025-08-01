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
  /* 
    Initial state:
      Rover 1: (0, 5, S) with instructions "MMMM"
      Rover 2: (0, 0, N) with instructions "MMRM"

    Turn-by-turn analysis:
      Turn 1:
        Rover 1: tries M (move south from (0,5) to (0,4)) - should succeed → (0, 4, S)
        Rover 2: tries M (move north from (0,0) to (0,1)) - should succeed → (0, 1, N)
      Turn 2:
        Rover 1: tries M (move south from (0,4) to (0,3)) - should succeed → (0, 3, S)
        Rover 2: tries M (move north from (0,1) to (0,2)) - should succeed → (0, 2, N)
      Turn 3:
        Rover 1: tries M (move south from (0,3) to (0,2)) - BLOCKED by Rover 2 at (0,2)
        Rover 2: tries R (turn right) → (0, 2, E)
      Turn 4:
        Rover 1: tries M (move south from (0,3) to (0,2)) - still BLOCKED by Rover 2 at (0,2)
        Rover 2: tries M (move east from (0,2) to (1,2)) - should succeed → (1, 2, E)
      Turn 5:
        Rover 1: tries M (move south from (0,3) to (0,2)) - should now succeed → (0, 2, S)
        Rover 2: (already completed all instructions)
      Turn 6:
        Rover 1: tries M (move south from (0,2) to (0,1)) - should succeed → (0, 1, S)
        Rover 2: (already completed all instructions)
  */
  {
    scenario: "collisionDetection",
    input: ["5 5", "0 5 S", "MMMM", "0 0 N", "MMRM"],
    expectedOutput: ["0 1 S", "1 2 E"],
  },
];

describe("answer", () => {
  testCases.forEach((testCase) => {
    it(testCase.scenario, () => {
      expect(moveRover(testCase.input)).toEqual(testCase.expectedOutput);
    });
  });
});
