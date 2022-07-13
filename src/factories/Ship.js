const Ship = (len) => {
  if (len < 0) throw new Error('Ship length cannot be negative.');
  const length = len;
  let lives = len;

  const hit = () => {
    lives--;
    return lives;
  };
  const isSunk = () => lives === 0;

  return { length, hit, isSunk };
};

export default Ship;
