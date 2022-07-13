const Ship = (len) => {
  if (len < 0) throw new Error('Ship length cannot be negative.');
  const length = len;
  let lives = len;
  // let hitPos = Array(len).fill(0); // 0 is unhit, and 1 is hit

  const hit = () => {
    lives--;
    return lives;
  };
  const isSunk = () => lives === 0;

  // const hitAt = (pos) => {
  //   if (pos >= length || pos <= -1)
  //     throw new Error('hitAt position is out of bounds. Check ship length.'); // check for out of bounds
  //   hitPos[pos] = 1;
  // };

  // hitPos.filter((hit) => hit !== 1).length === 0 ? true : false; // only returns true when the array has no 0s left

  return { length, hit, isSunk };
};

export default Ship;
