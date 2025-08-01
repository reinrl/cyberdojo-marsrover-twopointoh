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

  #move(plateauWidth, plateauHeight) {
    switch (this.direction) {
      case "N":
        if (this.y < plateauHeight) {
          this.y += 1;
        } else {
          return "Ran out of gravity :{";
        }
        break;
      case "E":
        if (this.x < plateauWidth) {
          this.x += 1;
        } else {
          return "Ran out of gravity :{";
        }
        break;
      case "S":
        if (this.y > 0) {
          this.y -= 1;
        } else {
          return "Ran out of gravity :{";
        }
        break;
      case "W":
        if (this.x > 0) {
          this.x -= 1;
        } else {
          return "Ran out of gravity :{";
        }
        break;
      default:
        return "ERROR: Invalid Direction";
    }
    return null;
  }

  #getPosition() {
    return this.x + " " + this.y + " " + this.direction;
  }

  handleInstructions(instructions, plateauWidth, plateauHeight) {
    for (let instruction of instructions) {
      if (instruction === "M") {
        let error = this.#move(plateauWidth, plateauHeight);
        if (error) {
          return error;
        }
      } else {
        this.#turn(instruction);
      }
    }

    return this.#getPosition();
  }
}

export default Rover;
