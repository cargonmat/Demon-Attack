class Floors {
    constructor(ctx, wSize, floorH) {
        this._ctx = ctx
        this._wSize = wSize
        this._hSize = 5
        this._posX = 0
        this._posY = floorH

    }


    draw() {
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(this._posX, this._posY, this._wSize, this._hSize);

    }
}