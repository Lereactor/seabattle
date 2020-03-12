alert('Welcome to the Game');
console.log('Well begin...');
//rate
const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
//Header gage title
const header = document.querySelector('.header');
//table space
const enemy = document.getElementById('enemy');
//button
const again = document.getElementById('again');
//ships
const game = {
    ships: [
        {
            location: ['26', '36', '46', '56'],
            hit: ['', '', '', '']
        },
        {
            location: ['11', '12', '13'],
            hit: ['', '', '']
        },
        {
            location: ['69', '79'],
            hit: ['', '']
        },
        {
            location: ['32'],
            hit: ['']
        }
    ],
    shipcount: 4,
};
//table for rate
const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
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
        this.changeClass(elem, 'hit')
    },
    miss(elem){
        this.changeClass(elem, 'miss');
    },
    dead(elem){
        this.changeClass(elem, 'dead')
    },
    changeClass(elem, value) {
        elem.className = value;
    }
}
//click to cell
const fire = (event) => {
    const target = event.target;
    if ((target.classList.length !== 0) || (target.tagName !== 'TD')) return;
    show.miss(target);
    play.updateData = 'shot';

    for (let i = 0; i < game.ships.length; i++) {
        const ship = game.ships[i];
        const index = ship.location.indexOf(target.id);
        if (index >= 0) {
            show.hit(target);
            play.updateData = 'hit';
            ship.hit[index] = 'x';
            const life = ship.hit.indexOf('');
            if (life < 0) {
                play.updateData = 'dead';
                for (const cell of ship.location) {
                    show.dead(document.getElementById(cell));
                }
                game.shipcount -= 1;
                if (game.shipcount < 1) {
                    header.textContent = 'Конец Игры';
                    header.style.color = '#06286b';
                    enemy.removeEventListener('click', fire);
                    
                    if (play.shot < play.record || play.record === 0) {
                        //for browser memory
                        localStorage.setItem('seaBattleRecord', play.shot);
                        play.record = play.shot;
                        play.render();
                    }
                }
            }
        }
    }
}
//function for start
const init = () => {
    play.render();
    enemy.addEventListener('click', fire)
//restart game
    again.addEventListener('click', () => location.reload());
//restart record with double click
    record.addEventListener('dblclick', () => {
        play.record = 0;
        localStorage.setItem('seaBattleRecord', 0);
        play.render();
    });
}
init();
console.log(enemy)
