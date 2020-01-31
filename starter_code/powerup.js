class Powerup {
    constructor(ctx, canvasW, gameHeight) {
        this._ctx = ctx;
        this._width = 50;
        this._height = 50;
        this._velX = 1;
        this._posX = canvasW;
        this._image = new Image();
        this._image.src = "./starter_code/img/potion.png";
        this._posY = Math.random() * gameHeight;
        this._velX = 3;
        this._velY = 6;
        this._gameHeight = gameHeight;

    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height);
    }

    move() {
        this._posX -= this._velX
        this._posY += this._velY

        if (this._posY + this._height >= this._gameHeight || this._posY <= 0) {
            this._velY *= -1.2
            this._velX *= 1.5
        }
    }
}