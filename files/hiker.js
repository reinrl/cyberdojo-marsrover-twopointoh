"use strict";
//["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"]

import Rover from "./Rover.js";

function moveRover(input) {
  let myReturn = [];
  let myGridSize = input[0].split(" ");
  let plateauWidth = parseInt(myGridSize[0]);
  let plateauHeight = parseInt(myGridSize[1]);

  for (let i = 1; i < input.length; i += 2) {
    let coordinates = input[i].split(" ");
    let x = coordinates[0];
    let y = coordinates[1];
    let direction = coordinates[2];
    let instructions = input[i + 1];

    let rover = new Rover(x, y, direction);
    let result = rover.handleInstructions(
      instructions,
      plateauWidth,
      plateauHeight
    );

    myReturn.push(result);
  }

  return myReturn;
}

export default moveRover;
