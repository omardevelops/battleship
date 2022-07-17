import { addListenerToEnemyBoard } from './dom-ui';
import GRID_SIZE from './CONSTANTS';
import Player from '../src/factories/Player.js';
import Gameboard from '../src/factories/Gameboard.js';
import Ship from '../src/factories/Ship.js';

const startGame = () => {
  // Setup game
  const first = { player: Player(), board: Gameboard(GRID_SIZE) };
  const second = { player: Player(), board: Gameboard(GRID_SIZE) };
  second.player.setIsComputer(true); // 2nd player is Computer
};

export default startGame;
