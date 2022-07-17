const GRID_SIZE = 10; // 10x10 grid size is standard
const Gameboard = (gridSize) => {
  let shipRegistry = {}; // Keeps track of Ship objects by indexing them
  let latestShipIndex = 1;
  let grid = []; // multi dimensional array when initialized

  const isPlacingShipAllowed = (shipLength, startPos, endPos, axis) => {
    if (startPos.y >= grid.length)
      throw new Error('input y coordinate out of bounds');
    else if (startPos.x >= grid[startPos.y].length)
      throw new Error('input x coordinate out of bounds');

    if (axis === 'x') {
      if (endPos.x >= grid[endPos.y].length)
        throw new Error('Ship longer than allocated space (x-axis)');
    } else if (axis === 'y') {
      if (endPos.y >= grid.length)
        throw new Error('Ship longer than allocated space (y-axis)');
    }

    // Checks the area in and around the ship. If not empty, returns false.
    for (let y = startPos.y - 1; y <= startPos.y + 1; y++) {
      if (grid[y] === undefined) continue; // skip loop for out of range coordinate (edge cases)
      let row = grid[y];
      for (let x = startPos.x - 1; x <= startPos.x + 1; x++) {
        if (row[x] !== 0 && row[x] !== undefined) return false;
      }
    }
    return true;
  };

  const registerShip = (ship) => {
    shipRegistry[latestShipIndex] = ship;
    latestShipIndex += 1;
  };
  const initializeGrid = () => {
    const size = !gridSize ? GRID_SIZE : gridSize;
    for (let i = 0; i < size; i++) {
      const arr = [];
      for (let i = 0; i < size; i++) arr.push(0);
      grid.push(arr); // 0 indicates empty spot
    }
  };
  const placeShipOnGrid = (shipIndex, startPos, axis) => {
    const ship = shipRegistry[shipIndex];
    let endPos = {};

    if (axis === 'x') {
      endPos.y = startPos.y;
      endPos.x = startPos.x + ship.length - 1; // end position is inclusive
    } else if (axis === 'y') {
      endPos.x = startPos.x;
      endPos.y = startPos.y + ship.length - 1; // end position is inclusive
    }

    if (isPlacingShipAllowed(ship, startPos, endPos, axis)) {
      if (axis === 'x')
        for (let i = startPos[axis]; i <= endPos[axis]; i++) {
          grid[startPos.y][i] = shipIndex;
        }
      else if (axis === 'y')
        for (let i = startPos[axis]; i <= endPos[axis]; i++) {
          grid[i][startPos.x] = shipIndex;
        }
    }
  };

  const receiveAttack = ({ x, y }) => {
    const target = grid[y][x];
    // If previously missed or already hit
    if (target === 'm' || target === 'x') return target;
    else if (target !== 0) {
      // Hit ship in this case
      const targetShip = shipRegistry[target]; // Fetch Ship object
      targetShip.hit(); // Register hit in object
      grid[y][x] = 'x'; // Update grid
    } else {
      // Otherwise missed
      grid[y][x] = 'm'; // Update grid
    }
  };

  const isEveryShipSunk = () => {
    const ships = Object.values(shipRegistry);
    let isAllSunk = true;
    ships.forEach((ship) => {
      if (ship.isSunk() === false) isAllSunk = false;
    });
    return isAllSunk;
  };

  initializeGrid();

  return {
    shipRegistry,
    grid,
    registerShip,
    placeShipOnGrid,
    receiveAttack,
    isEveryShipSunk,
  };
};

export default Gameboard;
