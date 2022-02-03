import platform from '../img/platform.png';
import background from '../img/background.png';
import hills from '../img/hills.png';
import smallPlatfotm from '../img/platformSmallTall.png';
import highPlatfotm from '../img/tallestPlatform.png';

import spriteRunLeft from '../img/spriteRunLeft.png';
import spriteRunRight from '../img/spriteRunRight.png';
import spriteStandLeft from '../img/spriteStandLeft.png';
import spriteStandRight from '../img/spriteStandRight.png';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
var jumpLimit = 0;
const speed = 10;
const goal = 7500;

canvas.width = 1024;
canvas.height = 576;

const gravity  = 1.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
   
        this.width = 66;
        this.height = 150; 

        this.image = createImage(spriteStandRight);
        this.frame = 0;
        this.sprites = {
          stand:{
            right: createImage(spriteStandRight),
            left: createImage(spriteStandLeft),
            cropWidth: 177,
            width: 66
          },
          run:{
            right: createImage(spriteRunRight),
            left: createImage(spriteRunLeft),
            cropWidth: 341,
            width: 127.875
          }
        }

        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 177;
    }

    draw() {
      c.drawImage(
        this.currentSprite,
        this.currentCropWidth * this.frame,
        0,
        this.currentCropWidth,
        400,
        this.position.x, 
        this.position.y,
        this.width,
        this.height
    );
    }

    update() {
        this.frame ++;
        if (this.frame > 59 
          && (this.currentSprite === this.sprites.stand.right
          || this.currentSprite === this.sprites.stand.left)){ 
          this.frame = 0;
        } else if (this.frame > 29 
          && (this.currentSprite === this.sprites.run.right
          || this.currentSprite === this.sprites.run.left)){ 
          this.frame = 0;
        }
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y +this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    } 
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    draw() {
        c.drawImage(
            this.image,
            this.position.x, 
            this.position.y
        );
    }
}

class GenericObject {
  constructor({ x, y, image }) {
      this.position = {
          x,
          y
      }
      this.image = image;
      this.width = image.width;
      this.height = image.height;
  }
  draw() {
      c.drawImage(
          this.image,
          this.position.x, 
          this.position.y
      );
  }
}

class FirstLayer {
  constructor({ x, y, image }) {
      this.position = {
          x,
          y
      }
      this.image = image;
      this.width = image.width;
      this.height = image.height;
  }
  draw() {
      c.drawImage(
          this.image,
          this.position.x, 
          this.position.y
      );
  }
}

function createImage (imgSrc) {
  const image = new Image();
  image.src = imgSrc;

  return image;
}

let defaultPlatform = createImage(platform);
let tinyPlatform = createImage(smallPlatfotm);
let tallestPlatform = createImage(highPlatfotm);

console.log(defaultPlatform);

let player = new Player();
let platforms = [];

let firstLayer = '';

let genericObject = [];

const keys = {
    right: {
        pressed: false  
    },
    left: {
        pressed: false  
    },
}

let scrollOffset = 0;

function init () {
  defaultPlatform = createImage(platform);
  tinyPlatform = createImage(smallPlatfotm);
  tallestPlatform = createImage(highPlatfotm);

  player = new Player();
  platforms = [
    //Talest Platform
    new Platform({
      x: defaultPlatform.width * 9 + defaultPlatform.height * 2 + tinyPlatform.width, 
      y: 170,
      image: tallestPlatform
    }),
    new Platform({
      x: defaultPlatform.width * 10 + defaultPlatform.height * 2 + tinyPlatform.width * 2, 
      y: 170,
      image: tallestPlatform
    }),

    //Tiny Platform
    new Platform({
      x: (defaultPlatform.width * 8 + defaultPlatform.height * 2 + tinyPlatform.width) - 1, 
      y: 370,
      image: tinyPlatform
    }),
    
    //Default Platform
    new Platform({
      x: -1, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: defaultPlatform.width - 3, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: defaultPlatform.width * 2 + defaultPlatform.height * 2, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: defaultPlatform.width * 4 + defaultPlatform.height, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: defaultPlatform.width * 5 + defaultPlatform.height * 3, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: (defaultPlatform.width * 6 + defaultPlatform.height * 3) - 1, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: defaultPlatform.width * 8 + defaultPlatform.height * 2, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: defaultPlatform.width * 8 + defaultPlatform.height * 2, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: defaultPlatform.width * 12 + defaultPlatform.height * 2 + tinyPlatform.width, 
      y: 470,
      image: defaultPlatform
    }),
    new Platform({
      x: (defaultPlatform.width * 13 + defaultPlatform.height * 2 + tinyPlatform.width) - 1, 
      y: 470,
      image: defaultPlatform
    }),
  ];

  firstLayer = new FirstLayer({
    x: -1, 
    y: -1,
    image: createImage(background)
  });

  genericObject = [
    new GenericObject({
      x: -1, 
      y: -1,
      image: createImage(hills)
    }),
  ];

  scrollOffset = 0;
}





function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'aliceblue';
    c.fillRect(0, 0, canvas.width, canvas.height);;

    firstLayer.draw();

    genericObject.forEach(object => {
      object.draw();
    });
    
    platforms.forEach(platform => {
        platform.draw();
    });
    player.update()

    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = speed;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -speed;
    } else {
        player.velocity.x = 0

        if (keys.right.pressed && scrollOffset <= goal) {
            scrollOffset += speed;
            platforms.forEach(platform => {
                platform.position.x -= speed;
            });

            genericObject.forEach((object) => {
              object.position.x -= speed - speed/2;
            });

            firstLayer.position.x -= speed/10;
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= speed;
            platforms.forEach(platform => {
                platform.position.x += speed;
            });

            genericObject.forEach((object) => {
              object.position.x += speed - speed/2;
            });

            firstLayer.position.x += speed/10;
        }
    } 

    // Platform collision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            jumpLimit = 0;
        }
    });

    // WIn condition
    if (scrollOffset > goal) {
      console.log('You win!');
    };

    // Lose condition
    if (player.position.y > canvas.height + canvas.height/2) {
      console.log('You Loose');
      init();
    }
}

init();
animate();

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    /* W */
    case 87:
      if (jumpLimit < 2) {
          player.velocity.y = -20;
          jumpLimit ++;
      }
    break;
    /* A */
    case 65:
      keys.left.pressed = true;
      player.currentSprite = player.sprites.run.left
      player.currentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
    break;
    /* S = 83 */
    /* D */
    case 68:
      keys.right.pressed = true;
      player.currentSprite = player.sprites.run.right;
      player.currentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
    break;
  }
});

addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    /* A */
    case 65:
      keys.left.pressed = false;
      player.currentSprite = player.sprites.stand.left;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;
    break;
    /* S = 83 */
    /* D */
    case 68:
      keys.right.pressed = false;
      player.currentSprite = player.sprites.stand.right;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;
    break;
  }
});