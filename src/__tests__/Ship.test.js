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

// // HitAt Position is mapped to the ship length
// test('hitAt position 2', () => {
//   const ship = Ship(3);
//   ship.hitAt(2);
//   expect(ship.hitPos).toStrictEqual([0, 0, 1]);
// });

// test('hitAt position 0 and position 2', () => {
//   const ship = Ship(3);
//   ship.hitAt(0);
//   ship.hitAt(2);
//   expect(ship.hitPos).toStrictEqual([1, 0, 1]);
// });

// test('hitAt out of bounds over length', () => {
//   const ship = Ship(2);
//   expect(() => ship.hitAt(3)).toThrow();
// });

// test('hitAt out of bounds less than 0', () => {
//   const ship = Ship(2);
//   expect(() => ship.hitAt(-3)).toThrow();
// });

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
