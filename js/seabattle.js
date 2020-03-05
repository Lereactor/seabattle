alert('Welcome to the Game');
console.log('Well begin...');
//rate
const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
//table space
const enemy = document.getElementById('enemy');
//button
const again = document.getElementById('again');
//table for rate
const play = {
    record: 0,
    shot: 0,
    hit: 0,
    dead: 0
}

const fire = () => console.log('Fire!')
//function for start
const init = () => {
    enemy.addEventListener('click', fire)
}
init();
console.log(enemy)
