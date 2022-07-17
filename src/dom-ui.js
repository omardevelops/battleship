import GRID_SIZE from './CONSTANTS';
const grids = [
  document.querySelector('#player1-grid'),
  document.querySelector('#player2-grid'),
];

const initializeGrids = () => {
  grids.forEach(
    (grid) =>
      (grid.style['grid-template-columns'] = `repeat(${GRID_SIZE}, 1fr)`)
  );
  for (let index = 0; index < GRID_SIZE * GRID_SIZE; index++) {
    grids.forEach((grid) => {
      const box = document.createElement('button');
      box.id = index;
      grid.appendChild(box);
    });
  }
};

const addListenerToEnemyBoard = (callback) => {
  grids[1].addEventListener('click', callback);
};

export { initializeGrids, addListenerToEnemyBoard };
