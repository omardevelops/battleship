const Player = () => {
  let isComputerPlayer = false;

  const getIsComputer = () => isComputerPlayer;
  const setIsComputer = (isComputer) => {
    isComputerPlayer = isComputer;
  };

  const attack = ({ x, y }, enemyBoard) => enemyBoard.receiveAttack({ x, y });

  const computerAttack = (enemyBoard) => {
    const gridSize = enemyBoard.grid.length;
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return attack({ x, y }, enemyBoard);
  };

  return { getIsComputer, setIsComputer, attack, computerAttack };
};

export default Player;
