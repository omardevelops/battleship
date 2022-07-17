import { addListenerToEnemyBoard } from './dom-ui';

const startGame = () => {
  addListenerToEnemyBoard(() => console.log('hi'));
};

export default startGame;
