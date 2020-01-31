class Finish {
    constructor(ctx, wSize, floorH) {
        this._ctx = ctx
        this._width = 30
        this._height = floorH
        this._posX = wSize
        this._posY = 0
        this._velX = 1
        this._image = new Image();
        this._image.src = "./img/endLine.png";
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }

    move() {
        this._posX -= this._velX
    }
}