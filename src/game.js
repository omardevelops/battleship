import {
  addListenerToAxisButton,
  addListenerToEnemyBoard,
  addListenerToResetButton,
  addListenerToRestartButton,
  addListenerToShipPlacement,
  addListenerToStartButton,
  initializeGrids,
  updateAxisButton,
  updateBoardUI,
  updateEndgameUI,
  updatePlacementStatus,
  updateRestartGameUI,
  updateUIforStartGame,
} from './dom-ui';
import { GRID_SIZE, gridXYMap } from './store';
import Player from './factories/Player';
import Gameboard from './factories/Gameboard';
import Ship from './factories/Ship';

let ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
let currentShipIndex = 1;
let currentAxis = 'x';
let board = null;
let isFirstTime = true; // For adding event listeners to buttons only once

// Creates and returns a gameboard with random ship placement
const genRandomEnemyBoard = () => {
  const randomBoard = Gameboard(10);
  const shipSizes = [5, 4, 3, 3, 2];
  const axes = ['x', 'y'];
  shipSizes.forEach((size) => randomBoard.registerShip(Ship(size)));
  let shipIndex = 1;
  let startPos;
  let axis;
  let isPlaced;
  do {
    startPos = Player().generateRandomXY();
    axis = axes[Math.floor(Math.random() * 2)];
    try {
      isPlaced = randomBoard.placeShipOnGrid(shipIndex, startPos, axis);
    } catch (error) {
      isPlaced = false;
    }
    if (isPlaced) shipIndex += 1;
  } while (isPlaced === false || shipIndex !== 6);
  return randomBoard;
};

const startGame = () => {
  // Setup game
  const first = {
    player: Player(),
    board: Gameboard(GRID_SIZE),
    isTurn: true,
  };
  const second = {
    player: Player(),
    board: Gameboard(GRID_SIZE),
    isTurn: false,
  };
  second.player.setIsComputer(true); // 2nd player is Computer

  // Setup first player gameboard
  first.board = board;
  console.log(board.grid);

  // Setup second player gameboard
  second.board = genRandomEnemyBoard();

  updateBoardUI(0, first.board, false);

  updateEndgameUI();

  // Setup click event on enemy board
  addListenerToEnemyBoard((event) => {
    if (first.isTurn) {
      const targetPos = gridXYMap[event.target.id]; // Get X and Y coordinates based on grid UI index
      const isTargetShip = second.board.isShipOnSpot(targetPos);

      // Only allow if spot is fresh (not hit before)
      if (second.board.isAttackingAllowed(targetPos)) {
        first.player.attack(targetPos, second.board);
        updateBoardUI(1, second.board, true);

        first.isTurn = false;
        second.isTurn = true;

        if (isTargetShip) {
          if (second.board.isEveryShipSunk()) {
            alert('Game over! Player 1 wins!');
            first.isTurn = false;
            second.isTurn = false;
            updateEndgameUI();
          }
        }
      }

      // Second player logic
      if (second.isTurn) {
        let target2;
        const previous = second.player.getPreviousHit();
        if (previous === null) {
          // Loop until randomly finding a valid spot
          do {
            target2 = second.player.generateRandomXY();
          } while (first.board.isAttackingAllowed(target2) === false);
        } else {
          // If there was a successful hit, get adjacent tiles
          const adjacentTiles = first.board.getAdjacentCoords(previous);
          const targetable = []; // Only target targetable tiles (allowed attk)

          adjacentTiles.forEach((tilePos) => {
            if (first.board.isAttackingAllowed(tilePos))
              targetable.push(tilePos);
          });
          // Choose one random targetable spot
          if (targetable.length !== 0) {
            const targetIndex = Math.floor(Math.random() * targetable.length);
            target2 = targetable[targetIndex];
          } else {
            do {
              target2 = second.player.generateRandomXY();
            } while (first.board.isAttackingAllowed(target2) === false);
          }
        }
        // Once valid spot found, attack, update UI and switch turns
        const isTargetShip2 = first.board.isShipOnSpot(target2);
        second.player.attack(target2, first.board);
        updateBoardUI(0, first.board, false);

        first.isTurn = true;
        second.isTurn = false;

        if (isTargetShip2) {
          // If ship, means successful hit, so update previouslyHit for smart AI
          second.player.setPreviousHit({ x: target2.x, y: target2.y });
          if (first.board.isEveryShipSunk()) {
            alert('Game over! Player 2 wins!');
            first.isTurn = false;
            second.isTurn = false;
            updateEndgameUI();
          }
        } else {
          // Missed, set previousHit to null
          second.player.setPreviousHit(null);
        }
      }
    }
  });
};

const resetGrid = () => {
  currentShipIndex = 1;
  currentAxis = 'x';
  board = Gameboard(GRID_SIZE);
  updateAxisButton(currentAxis);
  updatePlacementStatus(ships[0], 1);
  updateBoardUI(2, board, false);
};

const pregameSetup = () => {
  ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
  updatePlacementStatus(ships[currentShipIndex - 1], currentShipIndex);
  board = Gameboard(GRID_SIZE);

  addListenerToShipPlacement((event) => {
    if (currentShipIndex - 1 !== ships.length) {
      const position = gridXYMap[event.target.id];
      const ship = ships[currentShipIndex - 1];
      board.registerShip(ship, currentShipIndex);

      try {
        const isPlaced = board.placeShipOnGrid(
          currentShipIndex,
          position,
          currentAxis
        );
        if (isPlaced) {
          currentShipIndex += 1;
          updateBoardUI(2, board, false);
          if (currentShipIndex - 1 !== ships.length)
            updatePlacementStatus(
              ships[currentShipIndex - 1],
              currentShipIndex
            );
        } else {
          alert(
            'Cannot place ship here. Try another position that is at least 1 spot away from other ships.'
          );
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert(
        'No more ships left! You can either reset the grid or start the game.'
      );
    }
  });

  if (isFirstTime) {
    addListenerToAxisButton(() => {
      if (currentAxis === 'x') {
        currentAxis = 'y';
      } else {
        currentAxis = 'x';
      }
      updateAxisButton(currentAxis);
    });

    addListenerToResetButton(resetGrid);
    addListenerToStartButton(() => {
      if (currentShipIndex - 1 === ships.length) {
        updateUIforStartGame();
        startGame();
      } else {
        alert(
          `You still have ${
            ships.length - currentShipIndex + 1
          } ships left to place`
        );
      }
    });
    addListenerToRestartButton(() => {
      updateRestartGameUI();
      resetGrid();
      pregameSetup();
    });
    isFirstTime = false;
  }
};

export { pregameSetup, startGame };
