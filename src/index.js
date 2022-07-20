import './reset.css';
import './style.css';
import { initializeGrids } from './dom-ui';
import { pregameSetup, startGame } from './game';

initializeGrids();
pregameSetup();
startGame();
