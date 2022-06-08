const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


class Player {

    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 200;
        this.height = 30;

        this.radius = 7;

        //position de la brique
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height - 20
        }
    }
    //creation du joueur
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
    }

}


//dimension de la brique
// let width = 200;
// let height = 30;


// let radius = 7;
// let velocity = {
//     x: 0,
//     y: 0
// }

let velocityBall = {
    x: 0,
    y: 0
}

//position de la brique
// let position = {
//     player: {
//         x: canvas.width / 2 - width / 2,
//         y: canvas.height - height - 20
//     }
// }
const player = new Player();

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

//creation de la brique
// function rect() {
//     c.fillStyle = 'blue';
//     c.fillRect(position.player.x, position.player.y, width, height);
// }

// function update() {
//     rect();
//     position.player.x += velocity.x;
// }

// let positionBall = {
//     ball: {
//         x: position.player.x + width / 2,
//         y: position.player.y - 8
//     }
// }
//creation de la ball
// function rectBall() {
//     c.beginPath();
//     c.arc(positionBall.ball.x, positionBall.ball.y, 7, 0, Math.PI * 2);
//     c.fillStyle = 'red';
//     c.fill();
//     c.closePath();
// }

// function updateBall() {
//     rectBall();
//     positionBall.ball.y += velocityBall.y;
//     positionBall.ball.x += velocityBall.x;

// }

// class Ball {

//     constructor({
//         position,
//         velocity
//     }) {
//         this.position = position;
//         this.velocity = velocity;

//         this.radius = 3;
//     }

//     draw() {
//         c.beginPath();
//         c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
//         c.fillStyle = 'red';
//         c.fill();
//         c.closePath();
//     }

//     update() {
//         this.draw();
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y
//     }
// }

function animate() {

    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    // updateBall();

    // if (positionBall.ball.y + radius <= 0) {
    //     console.log('perdu y');
    //     velocityBall.y += +2;
    // }

    // if (positionBall.ball.x === position.player.x || positionBall.ball.y === position.player.y) {
    //     console.log("test");
    //     velocityBall.y += -2;
    // }

    // if (positionBall.ball.x + radius >= innerWidth) {
    //     console.log('perdu width');
    // }

    if (keys.q.pressed && player.position.x >= 0) {
        player.velocity.x = -7;
    } else if (keys.d.pressed && player.position.x + 200 <= canvas.width) {
        player.velocity.x = 7;
    } else {
        player.velocity.x = 0;
    }
}

animate();

//bouge la brique quand on appuie
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
        case ' ':
            console.log('space');
            velocityBall.y += -2;
            // velocityBall.x += 3;
            keys.space.pressed = true;
            break;
            // case 'ArrowRight':
            //     console.log('ArrowRight');
            //     break;
    }
})

//stop la brique au relachement du la touche
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
        case ' ':
            console.log('space');
            keys.space.pressed = false;
            break;
            // case 'ArrowRight':
            //     console.log('ArrowRight');
            //     break;
    }
})