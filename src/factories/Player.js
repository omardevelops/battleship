const Player = () => {
  let isComputerPlayer = false;

  const attack = ({ x, y }, enemyBoard) => {
    return enemyBoard.receiveAttack({ x, y });
  };

  const computerAttack = (enemyBoard) => {
    const gridSize = enemyBoard.grid.length;
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    attack({ x, y }, enemyBoard);
  };

  return { isComputerPlayer, attack, computerAttack };
};

export default Player;
