const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const button = document.querySelector('button');
const startScreen = document.querySelector('.screen');



canvas.width = 1000;
canvas.height = 576;
let start = true;


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
        image.src = './img/paddle.png';
        image.onload = () => {
            const scale = 1;
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

        const image = new Image();
        image.src = './img/ball.png';
        image.onload = () => {
            const scale = 0.15;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: (canvas.width / 2 - player.width / 2) + (player.width / 2 - 10),
                y: canvas.height - player.height - 40
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
                this.position.y = player.position.y - 20
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
            }
            //ball bas
            if (this.position.y > canvas.height) {
                game.over = true;

                // setTimeout(() => {
                //     game.active = false;
                // }, 100)
            }



            //player
            
                if ((this.position.x <= player.position.x + player.width) && (this.position.x >= player.position.x) && (player.position.y <= player.position.y + player.height) && (this.position.y >= player.position.y)) {
                    setTimeout(()=>{
                        this.velocity.y = - this.velocity.y;
                    },0)
                }
            


            grids.forEach((grid) => {

                grid.bricks.forEach((brick, i) => {
                    brick.update();

                    if (brick.position.y < 0) {
                        grid.bricks.splice(index, 1);
                    }

                    //condition AllBricks
                    if (ball.position.y - ball.height <= brick.position.y + brick.height && ball.position.x - ball.height >= brick.position.x && ball.position.x - ball.width <= brick.position.x + brick.width && ball.position.y + ball.width >= brick.position.y) {

                        this.velocity.y = -this.velocity.y;


                        setTimeout(() => {
                            const brickFound = grid.bricks.find(brick2 => brick2 === brick)

                            if (brickFound) {
                                grid.bricks.splice(i, 1);
                            }
                        }, 0)
                    };
                })

                if (grid.bricks.length == 0) {
                    game.win = true;
                }
            })
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

        // const colums = Math.floor(Math.random() * 5 + 2);
        const rows = Math.floor(Math.random() * 3 + 2);


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
    }
}

let game = {
    over: false,
    win: false,
    active: true
};

function animate() {
    if (!game.active) return

    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    ball.update();

    //move player
    if (keys.q.pressed && player.position.x >= 0) {
        player.velocity.x = -8;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 8;
    } else {
        player.velocity.x = 0;
    }

    if (game.win) {
        c.font = "normal 34pt Arial";
        c.fillStyle = 'green';
        c.fillText("GAME WON!", 400, 200);
        console.log('YOU WON');
        game.active = false;
        startScreen.style = 'block';

    } else if (game.over) {
        c.font = "normal 34pt Arial";
        c.fillStyle = 'red';
        c.fillText("GAME OVER!", 400, 200);
        console.log('YOU LOSE');
        game.active = false;
        startScreen.style = 'block';
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
            if (start) {
                ball.velocity.y += -4;
                ball.velocity.x += 5;
                ball.moving = true;
            }
            start = false;
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
    }
})

button.addEventListener('click', event => {

    location.reload();
    console.log('je suis dans le bouton');
    // animate();
});