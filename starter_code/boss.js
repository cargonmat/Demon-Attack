class Boss {
    constructor(ctx, gameWidth, gameHeight) {
        this._ctx = ctx;
        this._width = 150;
        this._height = 200;
        this._velX = 1;
        this._posX = gameWidth - this._width;
        this._image = new Image();
        this._image.src = "./img/Boss.png";
        this._posY = 0 + this._height;
        this._posY0 = 0 + this._height;
        this._image.frames = 10;
        this._image.framesIndex = 0;
        this._velY = 5;
        this._bossBullets = [];
        this._gameHeight = gameHeight;
    }

    draw(framesCounter) {
        this._ctx.drawImage(
            this._image,
            this._image.framesIndex * Math.floor(this._image.width / this._image.frames),
            0,
            Math.floor((this._image.width) / this._image.frames),
            this._image.height,
            this._posX,
            this._posY,
            this._width,
            this._height,
        );

        this.animate(framesCounter);

        this._bossBullets.forEach(bullet => bullet.draw());
    }

    move() {
        this._posY += this._velY

        if (this._posY + this._height - 30 >= this._gameHeight || this._posY + 50 <= 0) {
            this._velY *= -1

        }
        this._bossBullets.forEach(bullet => bullet.move());
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this._image.framesIndex++;
            if (this._image.framesIndex == 10) {
                this._image.framesIndex = 0;
            }
        }
        if (framesCounter % 50 == 0) {
            this._bossBullets.push(new BadBullets(this._ctx, this._posX, this._posY + this._height / 3 - 4, this._posY0, this._height))
        }
    }

}