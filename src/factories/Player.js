const Player = () => {
  let isComputerPlayer = false;

  const attack = ({ x, y }, enemyBoard) => {
    enemyBoard.receiveAttack({ x, y });
  };

  return { isComputerPlayer, attack };
};

export default Player;
