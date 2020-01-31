 class Sound {
     constructor(ctx) {
         this._ctx = ctx
         this._sound = new Audio();
         this._sound.src = "./starter_code/sound/bgMusic.mp3";
         this._sound.setAttribute("preload", "auto");
         this._sound.setAttribute("controls", "none");
         this._sound.style.display = "none";
     }

     play() {
         this._sound.play()
     }

     stop() {
         this._sound.pause()
     }
 }