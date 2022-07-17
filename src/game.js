import { addListenerToEnemyBoard } from './dom-ui';
import Player from '../src/factories/Player.js';
import Gameboard from '../src/factories/Gameboard.js';
import Ship from '../src/factories/Ship.js';

const startGame = () => {
  // Setup game
  const player1 = addListenerToEnemyBoard(() => console.log('hi'));
};

export default startGame;
