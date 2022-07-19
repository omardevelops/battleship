import { GRID_SIZE } from '../store';

const Player = () => {
  let isComputerPlayer = false;

  const getIsComputer = () => isComputerPlayer;
  const setIsComputer = (isComputer) => {
    isComputerPlayer = isComputer;
  };

  const attack = ({ x, y }, enemyBoard) => enemyBoard.receiveAttack({ x, y });

  const generateRandomXY = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
  };

  const computerAttack = (enemyBoard) => {
    const { x, y } = generateRandomXY();
    attack({ x, y }, enemyBoard);
  };

  return {
    getIsComputer,
    setIsComputer,
    attack,
    computerAttack,
    generateRandomXY,
  };
};

export default Player;
