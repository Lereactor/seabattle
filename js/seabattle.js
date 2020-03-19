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
    ships: [],
    shipcount: 0,
    optionShip: {
        count: [1,2,3,4], //count of ships
        size: [4,3,2,1] //ships size
    },
    collision: [],
    generateShip(){
        for  (let i = 0; i < this.optionShip.count.length; i++) {
            for (let j = 0; j < this.optionShip.count[i]; j++) {
                const size = this.optionShip.size[i];
                const ship = this.generateOptionShip(size);
                this.ships.push(ship);
                this.shipcount++;
            }
        }
    },
    generateOptionShip(shipSize){
        const shipb = {
            hit: [],
            location: [],
        };

        const direction = Math.random() < 0.5; // random from 0 to 0.999999
        let x, y;

        if (direction){
            //horizont
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * (10 - shipSize));
        } else {
            //verticale
            x = Math.floor(Math.random() * (10 - shipSize));
            y = Math.floor(Math.random() * 10);
        }


        for (let i = 0; i < shipSize; i++) {
            if (direction) {
                shipb.location.push(x + '' + (y + i));
            } else {
                shipb.location.push((x + i) + '' + y);
            }
            shipb.hit.push('');
        }
        
        if (this.checkCollision(shipb.location)) {
            return this.generateShip(shipSize)
        }
        this.addCollision(shipb.location);
        return shipb;
    },
    checkCollision(location) {
        for (const coord of location) {
            if (this.collision.includes(coord)) {
                return true;
            }
        }
    },
    addCollision(location){
        
    }
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
    game.generateShip();
    enemy.addEventListener('click', fire)
//restart game
    again.addEventListener('click', () => location.reload());
//restart record with double click
    record.addEventListener('dblclick', () => {
        play.record = 0;
        localStorage.clear(); //localStorage.setItem('seaBattleRecord', 0);
        play.render();
    });
    
    console.log(game.ships);
}
init();
console.log(enemy)
