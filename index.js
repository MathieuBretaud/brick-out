const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let width = 200;
let height = 30;


let velocity = {
    x: 0,
    y: 0
}

let position = {
    player: {
        x: canvas.width / 2 - width / 2,
        y: canvas.height - height - 20
    }
}

const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}





function rect() {

    c.fillStyle = 'blue';
    c.fillRect(position.player.x, position.player.y, width, height);
}

function update() {
    rect();
    position.player.x += velocity.x;
}

function animate() {

    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    update();

    if (keys.q.pressed && position.player.x >= 0) {
        velocity.x = -7;
    } else if (keys.d.pressed && position.player.x + 200 <= canvas.width) {
        velocity.x = 7;
    } else {
        velocity.x = 0;
    }
}

animate();

addEventListener('keydown', ({
    key
}) => {
    switch (key) {
        case 'q':
            console.log('left');
            keys.q.pressed = true;
            break;
        case 'd':
            console.log('right');
            keys.d.pressed = true;
            break;
        // case 'ArrowLeft':
        //     console.log('ArrowLeft');
        //     break;
        // case 'ArrowRight':
        //     console.log('ArrowRight');
        //     break;
    }
})

addEventListener('keyup', ({
    key
}) => {
    switch (key) {
        case 'q':
            console.log('left');
            keys.q.pressed = false;
            break;
        case 'd':
            console.log('right');
            keys.d.pressed = false;
            break;
        // case 'ArrowLeft':
        //     console.log('ArrowLeft');
        //     break;
        // case 'ArrowRight':
        //     console.log('ArrowRight');
        //     break;
    }
})