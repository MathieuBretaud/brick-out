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

        // this.width = 200;
        // this.height = 30;

        //position de la brique
        const image = new Image();
        image.src = './img/player.png';
        image.onload = () => {
            const scale = 0.25;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }
    //creation du joueur
    draw() {
        // c.fillStyle = 'blue';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }

}

class Ball {

    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.radius = 7;

        this.moving = false;

        this.haut = false;
        // this.position = {
        //     x: player.position.x + 200 / 2,
        //     y: player.position.y - 8
        // }

        const image = new Image();
        image.src = './img/ball.png';
        image.onload = () => {
            const scale = 0.15;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: player.position.x + player.width / 2 - 10,
                y: player.position.y
            }
        }
    }

    draw() {
        // c.beginPath();
        // c.arc(ball.position.x, ball.position.y, this.radius, 0, Math.PI * 2);
        // c.fillStyle = 'red';
        // c.fill();
        // c.closePath();

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        if (this.image) {
            this.draw();
            if (!this.moving) {
                this.position.x = player.position.x + player.width / 2 - 10,
                    this.position.y = player.position.y
            }
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            //ball gauche/droite
            if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
                this.velocity.x = -this.velocity.x;
            }
            //ball haut
            if (this.position.y <= 0) {
                this.velocity.y = -this.velocity.y;
                this.haut = true;
            }
            //ball bas
            if (this.position.y > canvas.height) {
                console.log('game over');
            }

            //player
            if (this.position.y > canvas.height - player.height - 20) {
                if ((this.position.x < player.position.x + player.width) && (this.position.x > player.position.x) && (player.position.y < player.position.y + player.height) && (this.position.y > player.position.y)) {
                    this.velocity.y += -2;
                }
            }



        }
    }
}

class Brick {
    constructor({
        position
    }) {

        const image = new Image();
        image.src = './img/brick.png';
        image.onload = () => {
            const scale = 1;
            this.image = image;
            this.width = 100 * scale;
            this.height = 30 * scale;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x,
                this.position.y,
                this.width,
                this.height
        }
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.bricks = [];

        const colums = Math.floor(Math.random() * 10 + 2);
        const rows = Math.floor(Math.random() * 3 + 2);
        // console.log(rows);
        // this.width = colums * 30;


        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < rows; y++) {
                this.bricks.push(new Brick({
                    position: {
                        x: i * 100,
                        y: y * 30
                    }
                }))
            }
        }
        console.log(this.bricks);



    }
}


const player = new Player();
const ball = new Ball();
const grids = [new Grid()];

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

function animate() {

    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    ball.update();



    grids.forEach((grid, index) => {
        // grid.update();

        grid.bricks.forEach(brick => {
            // if (brick.position.y <= 0) {
            //     grid.bricks.splice(index, 1);
            // }
            brick.update();
        })
    })

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
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
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
            // console.log('left');
            keys.q.pressed = true;
            break;
        case 'd':
            // console.log('right');
            keys.d.pressed = true;
            break;
        case ' ':
            // console.log('space');
            ball.velocity.y += -2;
            ball.velocity.x += 2;
            keys.space.pressed = true;
            ball.moving = true;
            break;
    }
})

//stop la brique au relachement du la touche
addEventListener('keyup', ({
    key
}) => {
    switch (key) {
        case 'q':
            // console.log('left');
            keys.q.pressed = false;
            break;
        case 'd':
            // console.log('right');
            keys.d.pressed = false;
            break;
        case ' ':
            // console.log('space');
            keys.space.pressed = false;
            break;
    }
})