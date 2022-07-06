const GRID_SIZE = 10; // 10x10 grid size is standard
const Gameboard = (gridSize) => {
  let shipRegistry = {}; // Keeps track of Ship objects by indexing them
  let latestShipIndex = 1;
  let grid = []; // multi dimensional array when initialized

  const registerShip = (ship) => (shipRegistry[latestShipIndex++] = ship);
  const initializeGrid = () => {
    let size = !gridSize ? GRID_SIZE : gridSize;
    for (let i = 0; i < size; i++) {
      const arr = [];
      for (let i = 0; i < size; i++) arr.push(0);
      grid.push(arr); // 0 indicates empty spot
    }
  };
  const placeShipOnGrid = (shipIndex, startPos, axis) => {
    const ship = shipRegistry[shipIndex];
    if (axis === 'x') {
      const endPos = startPos + ship.length - 1; // end position is inclusive
      for (let i = startPos; i <= endPos; i++) {
        // grid[i] = shipIndex;
      }
    } else if (axis === 'y') {
    }
  };

  initializeGrid();

  return { shipRegistry, grid, registerShip, placeShipOnGrid };
};

export default Gameboard;
