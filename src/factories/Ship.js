const Ship = (len) => {
  const length = len;
  let hitPos = Array(len).fill(0); // 0 is unhit, and 1 is hit

  const hitAt = (pos) => {
    if (pos >= length || pos <= -1) throw new Error('invalid'); // check for out of bounds
    hitPos[pos] = 1;
  };
  const isSunk = () =>
    hitPos.filter((hit) => hit !== 1).length === 0 ? true : false; // only returns true when the array has no 0s left

  return { length, hitPos, hitAt, isSunk };
};

export default Ship;
