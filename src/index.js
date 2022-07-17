import './reset.css';
import './style.css';

const grid1 = document.querySelector('#player1-grid');
const grid2 = document.querySelector('#player2-grid');
for (let index = 0; index < 100; index++) {
  const div = document.createElement('div');
  grid1.appendChild(div);
  const div2 = document.createElement('div');
  grid2.appendChild(div2);
}
