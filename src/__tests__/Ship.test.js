import Ship from '../factories/Ship';

test('Ship with negative length throws', () => {
  expect(() => Ship(-5)).toThrow();
});

test('Ship with length 2 is initialized', () => {
  const ship = Ship(2);
  expect(ship.length).toBe(2);
});

test('Hit function works', () => {
  const ship = Ship(4);
  expect(ship.hit()).toBe(3);
});

test('isSunk works correctly', () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('isSunk for still alive ship', () => {
  const ship = Ship(6);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
