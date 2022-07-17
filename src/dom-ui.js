const grids = [
  document.querySelector('#player1-grid'),
  document.querySelector('#player2-grid'),
];

const initializeGrids = () => {
  for (let index = 0; index < 100; index++) {
    grids.forEach((grid) => {
      const box = document.createElement('button');
      box.id = index;
      grid.appendChild(box);
    });
  }
};

export default initializeGrids;