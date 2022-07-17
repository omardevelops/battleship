import { addListenerToEnemyBoard } from './dom-ui';
import GRID_SIZE from './CONSTANTS';
import Player from './factories/Player';
import Gameboard from './factories/Gameboard';
import Ship from './factories/Ship';

const startGame = () => {
  // Setup game
  const first = { player: Player(), board: Gameboard(GRID_SIZE) };
  const second = { player: Player(), board: Gameboard(GRID_SIZE) };
  second.player.setIsComputer(true); // 2nd player is Computer
};

export default startGame;
