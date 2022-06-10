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

class Ball {

    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.radius = 7;

        this.position = {
            x: player.position.x + 200 / 2,
            y: player.position.y - 8
        }
    }

    draw() {
        c.beginPath();
        c.arc(ball.position.x, ball.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        if (this.position.x + this.radius >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            console.log('testtttttt');
        }else if (this.position.y + this.radius <= 0) {
            console.log('perdu y');
            this.velocity.y = +2;
        }else if (ball.position.x === player.position.x || ball.position.y === player.position.y) {
            console.log("test");
            ball.velocity.y += -2;
        } else {
            console.log('stop');
        }
    }
}


const player = new Player();
const ball = new Ball();

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

function animate() {

    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    ball.update();

    // if (ball.position.y + ball.radius <= 0) {
    //     console.log('perdu y');
    //     ball.velocity.y += +2;
    // }

    // if (ball.position.x === player.position.x || ball.position.y === player.position.y) {
    //     console.log("test");
    //     ball.velocity.y += -2;
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
            ball.velocity.y += -2;
            ball.velocity.x += 3;
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