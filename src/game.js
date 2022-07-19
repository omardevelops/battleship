import { addListenerToEnemyBoard, updateBoardUI } from './dom-ui';
import { GRID_SIZE, gridXYMap } from './store';
import Player from './factories/Player';
import Gameboard from './factories/Gameboard';
import Ship from './factories/Ship';

const startGame = () => {
  // Setup game
  const first = {
    player: Player(),
    board: Gameboard(GRID_SIZE),
    isTurn: true,
  };
  const second = {
    player: Player(),
    board: Gameboard(GRID_SIZE),
    isTurn: false,
  };
  second.player.setIsComputer(true); // 2nd player is Computer

  // Setup first player gameboard
  first.board.registerShip(Ship(4));
  first.board.registerShip(Ship(3));
  first.board.registerShip(Ship(3));
  first.board.registerShip(Ship(2));
  first.board.placeShipOnGrid(1, { x: 0, y: 4 }, 'x');
  first.board.placeShipOnGrid(2, { x: 2, y: 8 }, 'x');
  first.board.placeShipOnGrid(3, { x: 6, y: 4 }, 'y');
  first.board.placeShipOnGrid(4, { x: 7, y: 0 }, 'y');

  // Setup second player gameboard
  second.board.registerShip(Ship(4));
  second.board.registerShip(Ship(3));
  second.board.registerShip(Ship(3));
  second.board.registerShip(Ship(2));
  second.board.placeShipOnGrid(1, { x: 2, y: 3 }, 'y');
  second.board.placeShipOnGrid(2, { x: 2, y: 8 }, 'x');
  second.board.placeShipOnGrid(3, { x: 6, y: 4 }, 'x');
  second.board.placeShipOnGrid(4, { x: 8, y: 0 }, 'y');

  updateBoardUI(0, first.board, false);
  // updateBoardUI(1, second.board, true);

  // Setup click event on enemy board
  addListenerToEnemyBoard((event) => {
    if (first.isTurn) {
      const targetPos = gridXYMap[event.target.id];
      const targetValue = second.board.grid[targetPos.y][targetPos.x];

      // Only allow if spot is fresh (not hit before)
      if (typeof targetValue === 'number') {
        first.player.attack(targetPos, second.board);
        updateBoardUI(1, second.board, true);
        if (targetValue !== 0) {
          if (second.board.isEveryShipSunk())
            alert('Game over! Player 1 wins!');
        }
        first.isTurn = false;
        second.isTurn = true;
      }

      // Second player logic
      if (second.isTurn) {
        let attkResult;
        // Loop until attacking a new spot
        do {
          attkResult = second.player.computerAttack(first.board);
        } while (typeof attkResult !== 'number');
        // Once new spot found, update UI and switch turns
        updateBoardUI(0, first.board, false);
        // if (attkResult !== 0) {
        //   if (first.board.isEveryShipSunk())
        //     alert('Game over! Player 1 wins!');
        // }
        first.isTurn = true;
        second.isTurn = false;
      }
    }
  });
};

export default startGame;
