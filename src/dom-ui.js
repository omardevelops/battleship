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
    slotDiv.classList = [];
    if (slot === 0) {
      slotDiv.classList.add('empty');
    } else if (slot === 'x') slotDiv.classList.add('hit');
    else if (slot === 'm') slotDiv.classList.add('miss');
    else if (slot !== 0 && isEnemyBoard === false)
      slotDiv.classList.add('ship');
  });
};

const updatePlacementStatus = (ship, index) => {
  const header = document.querySelector('#headers > h1');
  header.textContent = `Place Ship ${index} (${ship.length} slots)`;
};

const updateAxisButton = (axis) => {
  const btn = document.querySelector('button#axis');
  btn.textContent = `Axis: ${axis.toUpperCase()}`;
};

// Runs at the end of the game to show the restart button
const updateEndgameUI = () => {
  const restartBtn = document.querySelector('button#restart');
  restartBtn.style.display = 'block';
};
// Runs when attempting a restart of the game. Does a complete reset of all UI.
const updateRestartGameUI = () => {
  // Remove all grid slots in DOM
  grids.forEach((grid) => {
    const children = Array.from(grid.children);
    children.forEach((child) => child.remove());
  });

  const h1 = document.querySelector('body > h1#placeship');
  const shipPlacement = document.querySelector('#ship-placement');
  const gridsContainer = document.querySelector('#grids-container');
  const restartBtn = document.querySelector('button#restart');

  h1.style.display = 'inline';
  shipPlacement.style.display = 'flex';
  gridsContainer.style.display = 'none';
  restartBtn.style.display = 'none';

  initializeGrids();
};

const updateUIforStartGame = () => {
  const h1 = document.querySelector('body > h1#placeship');
  const shipPlacement = document.querySelector('#ship-placement');
  const gridsContainer = document.querySelector('#grids-container');

  h1.style.display = 'none';
  shipPlacement.style.display = 'none';
  gridsContainer.style.display = 'flex';
};

const addListenerToEnemyBoard = (callback) => {
  grids[1].childNodes.forEach((child) =>
    child.addEventListener('click', callback)
  );
};

const addListenerToShipPlacement = (callback) => {
  grids[2].childNodes.forEach((child) => {
    child.addEventListener('click', callback);
  });
};

const addListenerToAxisButton = (callback) => {
  const btn = document.querySelector('button#axis');
  btn.addEventListener('click', callback);
};

const addListenerToResetButton = (callback) => {
  const btn = document.querySelector('button#reset');
  btn.addEventListener('click', callback);
};

const addListenerToStartButton = (callback) => {
  const btn = document.querySelector('button#start');
  btn.addEventListener('click', callback);
};

const addListenerToRestartButton = (callback) => {
  const btn = document.querySelector('button#restart');
  btn.addEventListener('click', callback);
};

export {
  initializeGrids,
  addListenerToEnemyBoard,
  addListenerToShipPlacement,
  addListenerToAxisButton,
  addListenerToResetButton,
  addListenerToStartButton,
  addListenerToRestartButton,
  updateBoardUI,
  updatePlacementStatus,
  updateAxisButton,
  updateEndgameUI,
  updateRestartGameUI,
  updateUIforStartGame,
};
