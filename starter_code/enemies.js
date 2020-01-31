class Enemies {
    constructor(ctx, canvasW, enemiesPos, gameHeight) {
        this._ctx = ctx;
        this._width = 50;
        this._height = 100;
        this._velX = 1;
        this._posX = canvasW;
        this._image = new Image();
        this._image.src = "./starter_code/img/SkeletonWalkRigth.png";
        this._posY = enemiesPos;
        this._image.frames = 13;
        this._image.framesIndex = 0;
        this._velX = 2;
        this._velY = 5;
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
    }

    move() {
        this._posX -= this._velX
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this._image.framesIndex++;
            if (this._image.framesIndex == 13) {
                this._image.framesIndex = 0;
            }
        }
    }

}
class Bird extends Enemies {
    constructor(ctx, canvasW, enemiesPos, gameHeight) {
        super(ctx, canvasW, enemiesPos, gameHeight)
        this._width = 50;
        this._posX = canvasW;
        this._height = 50;
        this._image = new Image();
        this._image.src = "./img/birder.png";
        this._posY = enemiesPos;
        this._velY = 7;
        this._velX = 3;
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height);
    }

    move() {
        this._posX -= this._velX

        this._posY += this._velY

        if (this._posY + this._height >= this._gameHeight || this._posY <= 0) {
            this._velY *= -1
        }
    }
}