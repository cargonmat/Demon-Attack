class Background {
    constructor(ctx, wSize, hSize) {
        this._ctx = ctx
        this._hSize = hSize
        this._wSize = wSize
        this._image = new Image()
        this._image.src = "./starter_code/img/War2.png"
        this._posX = 0
        this._posY = 0
        this._velX = 1
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._wSize, this._hSize)
        this._ctx.drawImage(this._image, this._posX + this._wSize, this._posY, this._wSize, this._hSize)
    }

    move() {
        if (this._posX <= -this._wSize) {
            this._posX = 0
        }
        this._posX -= this._velX
    }
}