class Player {
    constructor(ctx, w, h, keys) {
        this._ctx = ctx;
        this._gameWidth = w;
        this._gameHeight = h;
        this._image = new Image();
        this._image.src = "./starter_code/img/Gunner_Blue.png";
        this._width = 100;
        this._height = 140;
        this._posX = 0 + this._width;
        this._posY0 = this._gameHeight - this._height;
        this._posY = this._gameHeight - this._height;
        this._posY0G = this._gameHeight - this._height;
        this._velY = 1;
        this._velX = 10;
        this._image.frames = 6;
        this._image.framesIndex = 0;
        this._keys = keys;
        this._bullets = [];
        this._soundShoot = new Audio();
        this._soundShoot.src = "./starter_code/sound/fireSound.wav";
        this._soundJump = new Audio();
        this._soundJump.src = "./starter_code/sound/jumpSound.wav";
        this._soundDown = new Audio();
        this._soundDown.src = "./starter_code/sound/downSound.wav";
        this._timer = 0;
        this.setListeners();
        this._shootingDelay = false
    }

    draw(framesCounter) {
        this._ctx.drawImage(
            this._image,
            this._image.framesIndex * Math.floor(this._image.width / this._image.frames),
            0,
            Math.floor(this._image.width / this._image.frames),
            this._image.height,
            this._posX,
            this._posY,
            this._width,
            this._height,
        );

        this.animate(framesCounter);

        this._bullets.forEach(bullet => bullet.draw());
    }

    move() {
        let gravity = 0.4;

        if (this._posY <= this._posY0) {
            this._posY += this._velY;
            this._velY += gravity;
        } else { //toca el suelo
            this._velY = 1;
            this._posY = this._posY0;
        }

        this._bullets.forEach(bullet => bullet.move());
    }

    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
            this._image.framesIndex++;
            if (this._image.framesIndex == 6) {
                this._image.framesIndex = 0;
            }
        }
    }

    setListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {
                case this._keys.TOP_KEY:
                    this.jumpSound();
                    if (this._posY >= this._posY0) {
                        this._posY -= 20;
                        this._velY -= 12;
                    }
                    break;
                case this._keys.Z:
                    !this._shootingDelay ? this.shoot() : null
                    this.shootSound();
                    // }
                    break;
                case this._keys.DOWN:
                    this.downSound()
                    this._posY0 = this._posY0G;
                    break;
                case this._keys.RIGHT:
                    this._posX += 5
                    break;
                case this._keys.LEFT:
                    this._posX -= 10
                    break;
            }
        };
    }

    shoot() {
        this._shootingDelay = true
        this._bullets.push(new Bullet(this._ctx, this._posX + this._width - 30, this._posY + this._height / 3 - 4, this._posY0, this._height));
        setTimeout(() => {
            this._shootingDelay = false
        }, 600)
    }
    // playSound(src){
    // this._soundShoot.play()
    // }
    shootSound() {
        this._soundShoot.play()
    }

    jumpSound() {
        this._soundJump.play()
    }

    downSound() {
        this._soundDown.play()
    }
}