import { addListenerToEnemyBoard, updateBoardUI } from './dom-ui';
import { GRID_SIZE } from './store';
import Player from './factories/Player';
import Gameboard from './factories/Gameboard';
import Ship from './factories/Ship';

const startGame = () => {
  // Setup game
  const first = { player: Player(), board: Gameboard(GRID_SIZE) };
  const second = { player: Player(), board: Gameboard(GRID_SIZE) };
  second.player.setIsComputer(true); // 2nd player is Computer

  // Setup first player gameboard
  first.board.registerShip(Ship(4));
  first.board.registerShip(Ship(3));
  first.board.registerShip(Ship(3));
  first.board.registerShip(Ship(2));

  first.board.placeShipOnGrid(1, { x: 0, y: 4 }, 'x');
  first.board.placeShipOnGrid(2, { x: 2, y: 8 }, 'x');
  first.board.placeShipOnGrid(4, { x: 0, y: 7 }, 'x'); // fix bug
  updateBoardUI(0, first.board, false);
};

export default startGame;
