var background = document.getElementById("background");
var ctx = background.getContext("2d");

background.width = 400;
background.height = 300;
ctx.fillStyle = "black";


var pongSpeeds = 2;
var pongWidth = 10;
var pongHeight = 50;

var playerLocationToAi = 0;


class pong {
  constructor(x, y, side) {
    this._x = x;
    this._y = y;
    this._side = side;
  }
  //getters
  get getX() {
    return this._x;
  }
  get getY() {
    return this._y;
  }
  get getSide() {
    return this._side;
  }
  //setters
  set setSide(side) {
    this._side = toString(side);
  }
  set setX(x) {
    this._x = x;
  }
  set setY(y) {
    this._y = y;
  }

  //other useful shit
  draw() {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this._x, this._y);
    ctx.lineTo(this._x + pongWidth, this._y + 0);
    ctx.lineTo(this._x + pongWidth, this._y + pongHeight);
    ctx.lineTo(this._x - 0, this._y + pongHeight);
    ctx.lineTo(this._x + 0, this._y + 0);
    ctx.stroke();
  }
  collision() {
    if (this._y < 0) {
      this._y = 0;
    } else if (this._y > background.height - pongHeight) {
      this._y = background.height - pongHeight;
    }
  }
  ai() {
    if (ball._x >= background.width / 2 && this._side === 'right') {
      //Left Side
      if (ball._y - pongHeight / 2 <= this._y) {
        this._y -= pongSpeeds;
      } else {
        this._y += pongSpeeds;
      }
    } else if (ball._x <= background.width / 2 && this._side === 'left') {
      //Right side
      //Left Side
      if (ball._y - pongHeight / 2 <= this._y) {
        this._y -= pongSpeeds;
      } else {
        this._y += pongSpeeds;
      }
    }
    if (ball._xSpeed === (pongSpeeds/2) * 1 && this._side === "left") {
      if (this._y + (pongHeight/2)> background.height / 2) {
        this._y -= pongSpeeds;
      } else if (this._y - (pongHeight) < background.height / 2) {
        this._y += pongSpeeds;
      }
    }
    if (ball._xSpeed === (pongSpeeds/2) * -1 && this._side === "right") {
      if (this._y + (pongHeight/2)> background.height / 2) {
        this._y -= pongSpeeds;
      } else if (this._y - (pongHeight) < background.height / 2) {
        this._y += pongSpeeds;
      }
    }
  };

}
class ballC {
  constructor(x, y, xSpeed, ySpeed) {
    this._x = x;
    this._y = y;
    this._xSpeed = xSpeed;
    this._ySpeed = ySpeed;
  }
  get getX() {
    return this._x;
  }
  get getY() {
    return this._y;
  }
  get getXSpeed() {
    return this._xSpeed;
  }
  get getYSpeed() {
    return this._ySpeed;
  }
  set setX(x) {
    this._x = x;
  }
  set setY(y) {
    this._y = y;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this._x, this._y, pongWidth, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
  collision() {
    if (this._y < 0 + pongWidth / 2 || this._y > background.height - pongWidth / 2) {
      this._ySpeed *= -1;
    }
    if (this._x < 0 + pongWidth / 2 || this._x > background.width - pongWidth / 2) {
      this._xSpeed *= -1;
    }
    if (this._y < player.getY + pongHeight && this._y > player.getY && this._x < player.getX * 2 + pongWidth) {
      this._xSpeed *= -1;
      this.movement();
    }
    if (this._y < ai.getY + pongHeight && this._y > ai.getY && this._x > ai.getX - pongWidth) {
      this._xSpeed *= -1;
      this.movement();
    }
    if (this._x <= player._x) {
      this._x = background.width / 2;
      this._x = background.height / 2;
      this._xSpeed *= -1;
    } else if (this._x >= ai._x + pongWidth) {
      this._x = background.width / 2;
      this._x = background.height / 2;
      this._xSpeed *= -1;
    }
  }
  movement() {
    this._x += this._xSpeed;
    this._y += this._ySpeed;
  }
}

var moveUp = false;
var moveDown = false;
var distanceFromSide = 10;

document.addEventListener('keydown', function(event) {
  if (event.key === "w") {
    moveUp = true;
  };
  if (event.key === "s") {
    moveDown = true;
  };
})

document.addEventListener('keyup', function(event) {
  if (event.key === "w") {
    moveUp = false;
  };
  if (event.key === "s") {
    moveDown = false;
  };
})

let player = new pong(10, 0 + pongHeight, 'left');
let ai = new pong(background.width - (distanceFromSide + pongWidth), 0 + pongHeight, 'right');
let ball = new ballC(background.width / 2, background.height / 2, pongSpeeds / 2, pongSpeeds / 4);

//gameloop Handler
setInterval(function() {
  gameTick();
}, 5);


function gameTick() {
  ctx.clearRect(0, 0, background.width, background.height);
  if (moveUp) {
    player.setY = player.getY - pongSpeeds;
  }
  if (moveDown) {
    player.setY = player.getY + pongSpeeds;
  }
  ctx.fillRect(0, 0, background.width, background.height);
  //Player movement
  player.draw();
  player.ai();
  player.collision();
  //Ai movement
  ai.draw();
  ai.ai();
  ai.collision();
  //ball handler
  ball.movement();
  ball.collision();
  ball.draw();

}
//done