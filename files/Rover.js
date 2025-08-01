"use strict";

const cardinalDirections = ["N", "E", "S", "W"];

class Rover {
  constructor(x, y, direction) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.direction = direction;
  }

  #turn(instruction) {
    let myCurIndex = cardinalDirections.findIndex(
      (cardinalDirection) => cardinalDirection === this.direction
    );

    // take advantage of the circular nature of the array
    if (instruction === "R") {
      this.direction = cardinalDirections[(myCurIndex + 1) % 4];
    } else {
      this.direction = cardinalDirections[(myCurIndex + 3) % 4];
    }
  }

  #move(plateauWidth, plateauHeight, occupiedPositions = new Set()) {
    let attempts = 0;

    while (attempts < 4) {
      let canMove = false;
      let newX = this.x;
      let newY = this.y;
      let hitBoundary = false;

      switch (this.direction) {
        case "N":
          if (this.y < plateauHeight) {
            newY = this.y + 1;
            canMove = true;
          } else {
            hitBoundary = true;
          }
          break;
        case "E":
          if (this.x < plateauWidth) {
            newX = this.x + 1;
            canMove = true;
          } else {
            hitBoundary = true;
          }
          break;
        case "S":
          if (this.y > 0) {
            newY = this.y - 1;
            canMove = true;
          } else {
            hitBoundary = true;
          }
          break;
        case "W":
          if (this.x > 0) {
            newX = this.x - 1;
            canMove = true;
          } else {
            hitBoundary = true;
          }
          break;
        default:
          return "ERROR: Invalid Direction";
      }

      // Check if the new position is occupied by another rover
      const positionKey = `${newX},${newY}`;
      if (canMove && !occupiedPositions.has(positionKey)) {
        this.x = newX;
        this.y = newY;
        return null; // Successful move
      }

      // If we hit a boundary, turn right and try again
      if (hitBoundary) {
        this.#turn("R");
        attempts++;
      } else {
        // If we hit another rover, return a collision error (don't turn)
        return "collision";
      }
    }

    // If we've tried all 4 directions and none work
    return "Ran out of gravity :{";
  }

  getPosition() {
    return this.x + " " + this.y + " " + this.direction;
  }

  // Handle a single instruction with collision detection
  handleSingleInstruction(
    instruction,
    plateauWidth,
    plateauHeight,
    occupiedPositions = new Set()
  ) {
    if (instruction === "M") {
      return this.#move(plateauWidth, plateauHeight, occupiedPositions);
    } else {
      this.#turn(instruction);
      return null;
    }
  }
}

export default Rover;
