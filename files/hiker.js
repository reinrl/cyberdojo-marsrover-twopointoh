"use strict";
//["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"]

import Rover from "./Rover.js";

function moveRover(input) {
  let myGridSize = input[0].split(" ");
  let plateauWidth = parseInt(myGridSize[0]);
  let plateauHeight = parseInt(myGridSize[1]);

  // Parse all rovers and their instructions
  let rovers = [];
  for (let i = 1; i < input.length; i += 2) {
    let coordinates = input[i].split(" ");
    let x = coordinates[0];
    let y = coordinates[1];
    let direction = coordinates[2];
    let instructions = input[i + 1];

    let rover = new Rover(x, y, direction);
    rovers.push({
      rover: rover,
      instructions: instructions,
      currentInstructionIndex: 0,
      completed: false,
      result: null,
      retryCount: 0,
    });
  }

  // Execute instructions turn by turn
  let allCompleted = false;
  while (!allCompleted) {
    allCompleted = true;

    // Process each rover's next instruction
    for (let roverData of rovers) {
      if (roverData.completed) {
        continue;
      }

      allCompleted = false;

      if (roverData.currentInstructionIndex >= roverData.instructions.length) {
        // Rover has finished all instructions
        roverData.completed = true;
        roverData.result = roverData.rover.getPosition();
        continue;
      }

      let instruction =
        roverData.instructions[roverData.currentInstructionIndex];

      // Build occupied positions set for this specific rover's move attempt
      let occupiedPositions = new Set();
      rovers.forEach((otherRoverData) => {
        if (otherRoverData !== roverData && !otherRoverData.completed) {
          const positionKey = `${otherRoverData.rover.x},${otherRoverData.rover.y}`;
          occupiedPositions.add(positionKey);
        }
      });

      let error = roverData.rover.handleSingleInstruction(
        instruction,
        plateauWidth,
        plateauHeight,
        occupiedPositions
      );

      if (error && error.includes("gravity")) {
        // Rover hit boundary limit
        roverData.completed = true;
        roverData.result = error;
      } else if (error === "collision") {
        // Rover hit collision, increment retry count
        roverData.retryCount++;
        if (roverData.retryCount > 2) {
          // Skip this instruction after 3 attempts (0, 1, 2)
          roverData.currentInstructionIndex++;
          roverData.retryCount = 0;
        }
        // Otherwise, stay on the same instruction for next turn
      } else {
        // Successful move or turn, advance to next instruction
        roverData.currentInstructionIndex++;
        roverData.retryCount = 0;
      }
    }
  }

  // Collect results
  let results = [];
  for (let roverData of rovers) {
    if (roverData.result) {
      results.push(roverData.result);
    } else {
      results.push(roverData.rover.getPosition());
    }
  }

  return results;
}

export default moveRover;
