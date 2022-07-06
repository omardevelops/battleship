const GRID_SIZE = 10; // 10x10 grid size is standard
const Gameboard = (size) => {
  let shipRegistry = {}; // Keeps track of Ship objects by indexing them
  let latestShipIndex = 1;
  let grid = [];

  const registerShip = (ship) => (shipRegistry[latestShipIndex++] = ship);
  const initializeGrid = () => {
    let gridSize = !size ? GRID_SIZE : size;
    for (let i = 0; i < gridSize * gridSize; i++) {
      grid.push(0); // 0 indicates empty spot
    }
  };
  const placeShipOnGrid = (shipIndex, position, axis) => {};

  initializeGrid();

  return { shipRegistry, grid, registerShip, placeShipOnGrid };
};

export default Gameboard;
