# MARS ROVERS

## Week One
A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their on board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position is represented by a combination of an x and y coordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot.

'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

Input:

The input should included x and y coordinates specifying the upper-right coordinates of the plateau (the lower-left coordinates are assumed to be 0,0).

The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two pieces of input: the rover's starting position/compass orientation upon landing on the plateau, and a series of instructions telling the rover how to explore the plateau.

Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.

Output:

The output for each rover should be its final coordinates and heading.

### Test Input:
```
5 5

1 2 N

LMLMLMLMM

3 3 E

MMRMMRMRRM
```

### Expected Output:
```
1 3 N

5 1 E
```

## Week Two:
- Edit the rover code such that instead of falling off of the edge, it makes a 90 degree turn to the right, and attempt to do the move in that direction instead of the original orientation (this can be repeated until a valid move is uncovered).

- Edit the rover code such that the rovers take turns moving. The second rover to arrive at an occupied square would remain in its current location until the next turn. Attempt to retry the move up to 2 more times before skipping it and moving on to the next instruction.

## Week Three:
- Each rover should keep track of every grid coordinate that it has explored, and then at the end of processing the provided instructions it should output both the final location/direction and a grid showing coordinates that were explored (use an underscore for unexplored, and an X for explored).
