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
