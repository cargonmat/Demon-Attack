class Enemies {
    constructor(ctx, canvasW, enemiesPos, gameHeight) {
        this._ctx = ctx;
        this._width = 50;
        this._height = 100;
        this._velX = 1;
        this._posX = canvasW;
        this._image = new Image();
        this._image.src = "./img/SkeletonWalkRigth.png";
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
            this._image.framesIndex * Math.floor(this._image.width / this._image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor((this._image.width) / this._image.frames), //Punto x donde termina de recortar
            this._image.height, //Punto y donde termina de recortar
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
            this._image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
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

        this._posY += this._velY //Añadimos velY linear para que caigan

        if (this._posY + this._height >= this._gameHeight || this._posY <= 0) {
            this._velY *= -1 //Si llegan al suelo invertimos su velocidad para que "reboten"
        }
    }
}