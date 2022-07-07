import Gameboard from '../factories/Gameboard';
import Ship from '../factories/Ship';

test('Creates and registers ships', () => {
  const board = Gameboard();
  const destroyer1 = Ship(2);
  const destroyer2 = Ship(2);
  const cruiser = Ship(3);
  const battleship = Ship(4);
  board.registerShip(destroyer1);
  board.registerShip(destroyer2);
  board.registerShip(cruiser);
  board.registerShip(battleship);
  expect(board.shipRegistry).toEqual({
    1: destroyer1,
    2: destroyer2,
    3: cruiser,
    4: battleship,
  });
});

test('Places a ship on an empty grid x-axis', () => {
  const board = Gameboard(5);
  const ship = Ship(4);
  board.registerShip(ship);
  board.placeShipOnGrid(1, { x: 1, y: 1 }, 'x');
  expect(board.grid).toEqual([
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
});

test('Places a ship on an empty grid y-axis', () => {
  const board = Gameboard(5);
  const ship = Ship(4);
  board.registerShip(ship);
  board.placeShipOnGrid(1, { x: 3, y: 1 }, 'y');
  expect(board.grid).toEqual([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ]);
});

test('Places ships on an grid with other ships x-axis', () => {
  const board = Gameboard(5);
  const ships = [Ship(5), Ship(4), Ship(5)];
  ships.forEach((ship) => board.registerShip(ship));
  board.placeShipOnGrid(1, { x: 0, y: 0 }, 'x');
  board.placeShipOnGrid(2, { x: 1, y: 2 }, 'x');
  board.placeShipOnGrid(3, { x: 0, y: 4 }, 'x');
  expect(board.grid).toEqual([
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2],
    [0, 0, 0, 0, 0],
    [3, 3, 3, 3, 3],
  ]);
});

test('Places ships on an grid with other ships mixed axis', () => {
  const board = Gameboard(5);
  const ships = [Ship(5), Ship(3), Ship(3)];
  ships.forEach((ship) => board.registerShip(ship));
  board.placeShipOnGrid(1, { x: 0, y: 0 }, 'y');
  board.placeShipOnGrid(2, { x: 2, y: 2 }, 'x');
  board.placeShipOnGrid(3, { x: 2, y: 0 }, 'x');
  expect(board.grid).toEqual([
    [1, 0, 3, 3, 3],
    [1, 0, 0, 0, 0],
    [1, 0, 2, 2, 2],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ]);
});

test('Does not place a ship on a preexisting ship location', () => {
  const board = Gameboard(5);
  const ship1 = Ship(4);
  const newShip = Ship(3);
  board.registerShip(ship1);
  board.registerShip(newShip);
  board.placeShipOnGrid(1, { x: 0, y: 4 }, 'x');
  board.placeShipOnGrid(2, { x: 2, y: 4 }, 'x');
  expect(board.grid).toEqual([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
  ]);
});

test('Does not place a ship near preexisting ships (x-axis) ', () => {
  const board = Gameboard(5);
  const ship1 = Ship(4);
  const newShip = Ship(3);
  board.registerShip(ship1);
  board.registerShip(newShip);
  board.placeShipOnGrid(1, { x: 0, y: 4 }, 'x');
  board.placeShipOnGrid(2, { x: 1, y: 3 }, 'x');
  expect(board.grid).toEqual([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
  ]);
});

test('Placing ship out of bounds throws (x)', () => {
  const board = Gameboard(5); // 5x5 grid
  const ship = Ship(4);
  board.registerShip(ship);
  expect(() => board.placeShipOnGrid(1, { x: 5, y: 0 }, 'x')).toThrow(
    'input x coordinate out of bounds'
  );
});

test('Placing ship out of bounds throws (x and y)', () => {
  const board = Gameboard(5); // 5x5 grid
  const ship = Ship(4);
  board.registerShip(ship);
  expect(() => board.placeShipOnGrid(1, { x: 5, y: 7 }, 'x')).toThrow(
    'input y coordinate out of bounds'
  );
});

test('Placing ship longer than allowed throws (x-axis)', () => {
  const board = Gameboard(5); // 5x5 grid
  const ship = Ship(3);
  board.registerShip(ship);
  expect(() => board.placeShipOnGrid(1, { x: 3, y: 1 }, 'x')).toThrow(
    'Ship longer than allocated space (x-axis)'
  );
});

test('Placing ship longer than allowed throws (y-axis)', () => {
  const board = Gameboard(5); // 5x5 grid
  const ship = Ship(3);
  board.registerShip(ship);
  expect(() => board.placeShipOnGrid(1, { x: 1, y: 3 }, 'y')).toThrow(
    'Ship longer than allocated space (y-axis)'
  );
});

describe('Receive Attack function', () => {
  let board, ships;
  beforeEach(() => {
    board = Gameboard(5);
    ships = [Ship(4), Ship(3), Ship(2)];
    ships.forEach((ship) => board.registerShip(ship));
    board.placeShipOnGrid(1, { x: 0, y: 0 }, 'x');
    board.placeShipOnGrid(2, { x: 0, y: 2 }, 'x');
    board.placeShipOnGrid(3, { x: 0, y: 4 }, 'x');
  });

  test('Grid is updated for successful hit', () => {
    board.receiveAttack({ x: 1, y: 0 });
    expect(board.grid).toEqual([
      [1, 'x', 1, 1, 0],
      [0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0],
      [0, 0, 0, 0, 0],
      [3, 3, 0, 0, 0],
    ]);
  });

  test('Ship 3 sinks as expected after 2 hits', () => {
    board.receiveAttack({ x: 0, y: 4 });
    board.receiveAttack({ x: 1, y: 4 });
    expect(ships[2].isSunk()).toBe(true);
  });

  test('Miss attack is updated on grid', () => {
    board.receiveAttack({ x: 4, y: 0 });
    expect(board.grid).toEqual([
      [1, 1, 1, 1, 'm'],
      [0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0],
      [0, 0, 0, 0, 0],
      [3, 3, 0, 0, 0],
    ]);
  });
});

test.skip('meow', () => {
  const board = Gameboard();
});
