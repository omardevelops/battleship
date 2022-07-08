import Player from '../factories/Player';

describe('Player Attack func', () => {
  // Mock enemy board's receiveAttack function
  // Tests focus only on Player's public interface
  let mockEnemyBoard, player;
  beforeEach(() => {
    mockEnemyBoard = { receiveAttack: jest.fn(({ x, y }) => {}) };
    player = Player();
    player.attack({ x: 0, y: 0 }, mockEnemyBoard);
  });

  test('Player Attack calls receiveAttack exactly once', () => {
    expect(mockEnemyBoard.receiveAttack.mock.calls.length).toBe(1);
  });

  test('Player Attack passes exactly one argument to receiveAttack', () => {
    expect(mockEnemyBoard.receiveAttack.mock.calls[0].length).toEqual(1);
  });

  test('Player Attack passes correct argument to receiveAttack', () => {
    expect(mockEnemyBoard.receiveAttack.mock.calls[0][0]).toStrictEqual({
      x: 0,
      y: 0,
    });
  });
});

describe('Player Attack Func for already Missed/Hit spots', () => {
  beforeEach(() => {
    const mockHit = { receiveAttack: jest.fn(({ x, y }) => 'x') };
  });

  test('Handles already missed spot', () => {
    const player = Player();
    const mockMiss = { receiveAttack: jest.fn(({ x, y }) => 'm') };
    expect(player.attack({ x: 0, y: 0 }, mockMiss)).toBe('m');
  });

  test('Handles already successfuly hit spot', () => {
    const player = Player();
    const mockHit = { receiveAttack: jest.fn(({ x, y }) => 'x') };
    expect(player.attack({ x: 0, y: 0 }, mockHit)).toBe('x');
  });
});
