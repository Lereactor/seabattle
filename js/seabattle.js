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
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
}
//BD for target
const show = {
    hit(elem) {
    },
    miss(elem){
        this.changeClass(elem, 'miss');
    },
    dead(elem){
    },
    changeClass(elem, value) {
        elem.className = value;
    }
}
//click to cell
const fire = (event) => {
    const target = event.target
    show.miss(target);
    play.updateData = 'shot';
}
//function for start
const init = () => {
    enemy.addEventListener('click', fire)
}
init();
console.log(enemy)
