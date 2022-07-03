const Ship = (len) => {
  const length = len;
  let hitPos = []; // 0 is unhit, and 1 is hit

  const hit = (pos) => -1;
  const isSunk = () => -1;

  return { length, hit, isSunk };
};

export default Ship;
