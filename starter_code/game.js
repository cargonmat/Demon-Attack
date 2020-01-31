const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    enemies: [],
    floor: [],
    finish: undefined,
    score: undefined,
    keys: {
        TOP_KEY: 38,
        Z: 90,
        DOWN: 40,
        RIGHT: 39,
        LEFT: 37,
    },
    randomPos: 0,
    enemyPos: 0,
    bgsong: undefined,
    boss: undefined,
    powerup: undefined,
    timer: 0,
    protection: false,
    protectimer: 0,
    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.setDimensions();
        this.setHandlers();
        this.start();
    },

    setDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    setHandlers() {
        window.onresize = () => this.setDimensions()
    },

    start() {
        this.reset();

        this.interval = setInterval(() => {
            console.log(this.protection)
            console.log(this.protectimer)
            console.log(this.timer)
            this.randomizer();
            if (this.framesCounter > 1000) this.framesCounter = 0;
            if (this.timer > 500) this.framesCounter = 0;
            this.framesCounter++;
            this.drawAll();
            this.moveAll();
            this.playAll();
            this.generateEnemies();
            this.clearAll();
            this.floorCollision();
            if (this.isCollision()) {
                this.gameOver();
            };
            this.bulletCollision();
            this.position();
            this.endGame();
            if (this.protection) {
                this.protectimer++
            }
            if (this.isDeath()) {

                if (!this.protection) {
                    this.gameOver()
                }
            };
            this.isBossDeath();
            this.Shield();
        }, 1000 / this.fps);
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, this.width, this.height, this.keys);
        this.finish = new Finish(this.ctx, this.width, this.height);
        this.boss = new Boss(this.ctx, this.width, this.height);
        this.powerup = new Powerup(this.ctx, this.width, this.height);
        this.enemies = [];
        this.floor = [];
        this.bgsong = new Sound(this.ctx)
        this.generateFloor();
        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;
        this.protection = false;
        this.timer = 0;
        this.protectimer = 0;
    },

    drawAll() {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.enemies.forEach(enm => enm.draw(this.framesCounter));
        this.floor.forEach(flr => flr.draw(this.framesCounter));
        (this.score >= 200) ? this.finish.draw(): null;
        (this.score >= 50 && this.score < 300) ? this.boss.draw(this.framesCounter): null;
        (this.score >= 50 && this.timer == 0) ? this.powerup.draw(): null;
        this.drawScore()
    },

    moveAll() {
        this.background.move();
        this.player.move();
        this.enemies.forEach(enm => enm.move());
        (this.score >= 300) ? this.finish.move(): null;
        (this.score >= 50 && this.score < 300) ? this.boss.move(): null;
        (this.score >= 50) ? this.powerup.move(): null;
    },
    playAll() {
        this.bgsong.play()
    },

    generateEnemies() {
        if (this.score < 50) {
            if (this.framesCounter % 170 == 0) {
                this.enemies.push(new Enemies(this.ctx, this.width, this.enemyPos, this.height));
                this.enemies.push(new Bird(this.ctx, this.width, this.enemyPos, this.height));
            }
        }
    },

    clearAll() {
        this.enemies.forEach((enm, idx) => {
            if (enm._posX + enm._width <= 0) {
                this.enemies.splice(idx, 1);
            }
        });
        this.player._bullets.forEach((bll, idx) => {
            if (bll._posX >= this.width) {
                this.player._bullets.splice(this.player._bullets.indexOf(bll), idx);
            }
        });
        this.boss._bossBullets.forEach((bll, idx) => {
            if (bll._posX <= 0) {
                this.boss._bossBullets.splice(this.boss._bossBullets.indexOf(bll), idx);

            }
        });
    },

    randomizer() {
        this.randomPos = 1 + Math.floor(Math.random() * 5)
    },

    position() {
        if (this.randomPos == 1) {
            this.enemyPos = 671 + 50
        } else if (this.randomPos == 2) {
            this.enemyPos = 521 + 50
        } else if (this.randomPos == 3) {
            this.enemyPos = 371 + 50
        } else if (this.randomPos == 4) {
            this.enemyPos = 221 + 50
        } else {
            this.enemyPos = 120
        }
    },

    isCollision() {
        return this.enemies.some(
            enm =>
            this.player._posX + this.player._width - 50 >= enm._posX &&
            this.player._posY + this.player._height - 50 >= enm._posY &&
            this.player._posX <= enm._posX + enm._width - 50 &&
            this.player._posY <= enm._posY + enm._height - 50
        );
    },

    gameOver() {
        document.getElementById("myCanvas").style.zIndex = "-1";
        document.getElementById("myCanvas").style.display = "block";
        document.getElementById("start-button").style.zIndex = "1";
        document.getElementById("start-button").style.display = "block";
        document.getElementById("start-button").style.position = "absolute";
        document.getElementById("start-button").style.margin = "calc(50vh - 300px) auto 0px;";
        this.bgsong.stop()
        clearInterval(this.interval);
    },

    bulletCollision() {
        return this.enemies.some(
            (enm, idx) => {
                this.player._bullets.some(
                    (bllt, idxB) => {
                        let bool =
                            bllt._posX + bllt._wSize - 30 >= enm._posX &&
                            bllt._posY + bllt._hSize - 30 >= enm._posY &&
                            bllt._posX <= enm._posX + enm._width &&
                            bllt._posY <= enm._posY + enm._height
                        if (bool) {
                            return this.killEnemies(idx, idxB)
                        }
                    })
            }
        )
    },

    killEnemies(idx, idxB) {
        this.enemies.splice(idx, 1);
        this.player._bullets.splice(idxB, 1);
        this.score += 5
    },

    generateFloor() {
        var i;
        for (i = 0; i <= 4; i++) {
            this.floor.push(new Floors(this.ctx, this.width, this.height - 150 * i));
        }
    },

    floorCollision() {
        document.onkeyup = e => {
            // if (e.keyCode === 40) {}
            return this.floor.some(
                flr => {
                    let bool = this.player._posY + this.player._height + 100 >= flr._posY &&
                        this.player._posY <= flr._posY

                    if (bool) this.newFloor(flr._posY - this.player._height + 30)
                    return bool
                }
            )
        }
    },

    newFloor(newPositionY) {
        this.player._posY0 = newPositionY
    },

    drawScore() {
        //con esta funcion pintamos el marcador
        this.scoreboard.update(this.score);
    },

    endGame() {
        if (this.player._posX + this.player._width - 50 >= this.finish._posX &&
            this.player._posY + this.player._height - 50 >= this.finish._posY &&
            this.player._posX <= this.finish._posX + this.finish._width - 50 &&
            this.player._posY <= this.finish._posY + this.finish._height - 50) {
            this.gameOver();
        }
    },

    isDeath() {

        return this.boss._bossBullets.some(
            bssbll =>
            this.player._posX + this.player._width - 60 >= bssbll._posX + 10 &&
            this.player._posY + this.player._height - 50 >= bssbll._posY &&
            this.player._posX <= bssbll._posX + bssbll._wSize - 50 &&
            this.player._posY <= bssbll._posY + bssbll._hSize - 30
        );
    },

    isBossDeath() {
        if (this.score >= 50) {
            return this.player._bullets.some(
                (bllt, idxB) => {
                    let bool =
                        bllt._posX + bllt._wSize - 50 >= this.boss._posX &&
                        bllt._posY + bllt._hSize - 50 >= this.boss._posY &&
                        bllt._posX <= this.boss._posX + this.boss._width &&
                        bllt._posY <= this.boss._posY + this.boss._height
                    if (bool) {
                        return this.killBoss(idxB)
                    }
                })
        }
    },

    killBoss(idxB) {
        this.player._bullets.splice(idxB, 1);
        this.boss._velY *= 1.5
        this.boss._bossBullets._velX *= 1.5
        this.score += 50
    },
    Shield() {
        if (

            this.player._posX + this.player._width - 50 >= this.powerup._posX &&
            this.player._posY + this.player._height - 50 >= this.powerup._posY &&
            this.player._posX <= this.powerup._posX + this.powerup._width &&
            this.player._posY <= this.powerup._posY + this.powerup._height
        ) {

            this.protection = true
            setTimeout(() => {
                this.protection = false
            }, 8000)
            this.timer++
        }

    },
}