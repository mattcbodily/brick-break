const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

function Player(){
    this.x = 340;
    this.y = 460;
    this.xSpeed = 0;
    this.width = 120;
}

function Ball(){
    this.x = 140;
    this.y = 240;
    this.xSpeed = 2;
    this.ySpeed = 2;
}

const scale = 20;
let player;
let ball;

let bricks = [];

(function brickMaker(){
    let id = 0;
    let row = 1;
    let brickX = 20;
    let brickY = 20;
    for(let i = 1; i <= 21; i++){
        bricks.push({id, row, x: brickX, y: brickY, height: 28, width: 116})

        brickX += 124;
        
        if(brickX + 116 >= canvas.width){
            row++
            brickX = 20;
            brickY += 40;
        }
    }
}())


function draw(){
    player = new Player();
    ball = new Ball();
    ctx.fillStyle = '#FFF';
    ctx.font = '40px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillRect(player.x, player.y, player.width, scale);
    
    return (function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < bricks.length; i++){
            if(bricks[i].row === 1){
                ctx.fillStyle = '#F21B3F';
            } else if(bricks[i].row === 2){
                ctx.fillStyle = '#1BDB00';
            } else if(bricks[i].row === 3){
                ctx.fillStyle = '#256EFF';
            }
            ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height)
        }

        ctx.fillStyle = '#FF6F59';
        ctx.fillRect(ball.x, ball.y, scale, scale);
        ctx.fillStyle = '#CABAC8';
        ctx.fillRect(player.x, player.y, player.width, scale);

        ball.x += ball.xSpeed;
        ball.y += ball.ySpeed;

        player.x += player.xSpeed;

        if(player.x === 0 || player.x + player.width === canvas.width){
            player.xSpeed = 0;
        }

        if((ball.x + scale === player.x || ball.x === player.x + player.width) && (ball.y >= player.y - scale && ball.y - scale <= player.y + scale)){
            player.xSpeed = 0;
            ball.xSpeed *= -2;
        } else if(ball.x + scale >= player.x && ball.x <= player.x + player.width && (ball.y >= player.y - scale && ball.y <= player.y)){
            ball.ySpeed *= -1;
            if((player.xSpeed > 0 && ball.xSpeed <= 0) || (player.xSpeed < 0 && ball.xSpeed >= 0)){
                ball.xSpeed *= -1;
            }
        } else if(ball.x <= 0){
            ball.x = 0;
            ball.xSpeed *= -1;
        } else if(ball.x + scale >= canvas.width){
            ball.x = canvas.width - scale;
            ball.xSpeed *= -1;
        } else if(ball.y <= 0){
            ball.ySpeed *= -1;
        } else if(ball.y >= canvas.height){
            ctx.fillText('Game Over', canvas.width / 2, 240)
            cancelAnimationFrame(animation)
        }

        for(let i = 0; i < bricks.length; i++){
            if((ball.y - scale === bricks[i].y && ball.x + scale >= bricks[i].x && ball.x <= bricks[i].x + bricks[i].width) || (ball.y === bricks[i].y - bricks[i].height && ball.x + scale >= bricks[i].x && ball.x <= bricks[i].x + bricks[i].width)){
                ball.ySpeed *= -1;
                bricks.splice(i, 1);
            } else if((ball.x + scale === bricks[i].x || ball.x === bricks[i].x + bricks[i].width) && ball.y + scale >= bricks[i].y && ball.y + scale <= bricks[i].y + bricks[i].height){
                ball.xSpeed *= -1;
                bricks.splice(i, 1);
            }
        }

        if(bricks.length === 0){
            ctx.fillText('You Won!', canvas.width / 2, 240);
            cancelAnimationFrame(animation);
        }

        let animation = requestAnimationFrame(animate)
    }())
}

draw();

document.addEventListener('keydown', function(event){
    if(event.keyCode === 37 && player.x !== 0){
        if(player.x !== 0){
            player.xSpeed = -4;
        }
    } else if(event.keyCode === 39 && player.x + player.width !== canvas.width){
        if(player.x + 125 !== canvas.width){
            player.xSpeed = 4;
        }
    } else if(event.keyCode === 40){
        player.xSpeed = 0;
    }
});