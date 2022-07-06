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

test('Places a ship on an empty grid horizontally (1)', () => {
  const board = Gameboard(5);
  const ship = Ship(4);
  board.registerShip(ship);
  board.placeShipOnGrid(1, 0, 'x');
  expect(board.grid).toEqual([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
});

test.skip('Places a ship on an empty grid horizontally (2)', () => {
  const board = Gameboard(5);
  const ship = Ship(4);
  board.registerShip(ship);
  board.placeShipOnGrid(1, 0, 'x');
  expect(board.grid).toEqual([
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
});

test.skip('meow', () => {
  const board = Gameboard();
});
