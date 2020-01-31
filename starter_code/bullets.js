class Bullet {
    constructor(ctx, x, y, y0, playerH) {
        this._ctx = ctx
        this._posX = x;
        this._posY = y;
        this._posY0 = y0
        this._playerHeight = playerH
        this._wSize = 50;
        this._hSize = 30;
        this._velX = 10;
        this._image = new Image()
        this._image.src = "./img/Bullets.png";
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._wSize, this._hSize)
    }

    move() {
        this._posX += this._velX
    }
}
class BadBullets extends Bullet {
    constructor(ctx, x, y, y0, bossH) {
        super(ctx, x, y, y0)
        this._ctx = ctx
        this._posX = x;
        this._posY = y;
        this._posY0 = y0
        this._bossHeight = bossH
        this._wSize = 100;
        this._hSize = 80;
        this._velX = 10;
        this._image = new Image()
        this._image.src = "./img/bossBullet.png";
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._wSize, this._hSize)
    }

    move() {
        this._posX -= this._velX
    }
}