const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

function Player(){
    this.x = 350;
    this.y = 450;
    this.xSpeed = 25;
    this.width = 125;
}

function Ball(){
    this.x = 150;
    this.y = 250;
    this.xSpeed = 2;
    this.ySpeed = 2;
}

const scale = 20;
let player;
let ball;

function draw(){
    player = new Player();
    ball = new Ball();
    ctx.fillStyle = '#FFF';
    ctx.fillRect(player.x, player.y, player.width, scale);
    
    return (function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(ball.x, ball.y, scale, scale);
        ctx.fillRect(player.x, player.y, player.width, scale);

        ball.x += ball.xSpeed;
        ball.y += ball.ySpeed;

        if(ball.x >= player.x && ball.x <= player.x + player.width && ball.y === player.y - scale){
            ball.ySpeed *= -1;
        } else if(ball.x === 0 || ball.x + scale === canvas.width){
            ball.xSpeed *= -1;
        } else if(ball.y === 0){
            ball.ySpeed *= -1;
        } else if(ball.y === canvas.height){
            cancelAnimationFrame(animation)
        }

        let animation = requestAnimationFrame(animate)
    }())
}

draw();

document.addEventListener('keydown', function(event){
    if(event.keyCode === 37){
        if(player.x !== 0){
            player.x -= player.xSpeed;
        }
    } else if(event.keyCode === 39){
        if(player.x + 125 !== canvas.width){
            player.x += player.xSpeed;
        }
    }
});