import { GRID_SIZE, gridXYMap } from './store';

const grids = [
  document.querySelector('#player1-grid'),
  document.querySelector('#player2-grid'),
  document.querySelector('#ship-placement .grid'),
];

const form = document.querySelector('form');

const initializeGrids = () => {
  for (let index = 0; index < GRID_SIZE * GRID_SIZE; index++) {
    grids.forEach((grid) => {
      const box = document.createElement('button');
      box.id = index;
      grid.appendChild(box);
    });
  }
};

const updateBoardUI = (gridIndex, board, isEnemyBoard) => {
  const gridDiv = grids[gridIndex];
  const { grid } = board;
  gridDiv.childNodes.forEach((slotDiv, index) => {
    const pos = gridXYMap[index];
    const slot = grid[pos.y][pos.x];
    if (slot === 0) slotDiv.classList.add('empty');
    else if (slot === 'x') slotDiv.classList.add('hit');
    else if (slot === 'm') slotDiv.classList.add('miss');
    else if (slot !== 0 && isEnemyBoard === false)
      slotDiv.classList.add('ship');
  });
};

const addListenerToEnemyBoard = (callback) => {
  grids[1].childNodes.forEach((child) =>
    child.addEventListener('click', callback)
  );
};

export { initializeGrids, addListenerToEnemyBoard, updateBoardUI };
