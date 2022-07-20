const GRID_SIZE = 10;
const gridXYMap = [];

const initializeMap = () => {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      gridXYMap.push({ x, y });
    }
  }
};

initializeMap();

export { gridXYMap, GRID_SIZE };
